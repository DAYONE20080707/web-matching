"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { CompanyInfoSchema } from "@/schemas"
import { prefectureMapping } from "@/lib/utils"
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage"
import { extractPublicId } from "cloudinary-build-url"
import axios from "axios"

export const getGeocodeFromGSI = async (address: string) => {
  const makeUrl = "https://msearch.gsi.go.jp/address-search/AddressSearch?q="
  const s_quote = encodeURIComponent(address)
  const response = await axios.get(makeUrl + s_quote)

  if (response.data.length > 0) {
    const [longitude, latitude] = response.data[0]["geometry"]["coordinates"]
    return { latitude, longitude }
  } else {
    throw new Error("住所が見つかりません")
  }
}

export const getCompanyById = async ({
  companyId,
}: {
  companyId: string | null
}) => {
  try {
    if (!companyId) {
      return null
    }

    const company = await db.company.findUnique({
      where: { id: companyId },
      include: {
        users: true,
        images: true,
      },
    })

    return company
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getCompanyWithPerformanceById = async ({
  companyId,
}: {
  companyId: string | null
}) => {
  try {
    if (!companyId) {
      return null
    }

    const company = await db.company.findUnique({
      where: { id: companyId },
      include: {
        users: true,
        performances: {
          orderBy: {
            updatedAt: "desc",
          },
        },
        images: true,
      },
    })

    return company
  } catch (err) {
    console.error(err)
    return null
  }
}

export interface editCompanyProps extends z.infer<typeof CompanyInfoSchema> {
  id: string
  companyArea: string
  base64Image: string | undefined
  companyImages: { url: string; isNew: boolean }[]
}

export const editCompany = async (values: editCompanyProps) => {
  try {
    const {
      id,
      companyAreaList,
      base64Image,
      companyImages,
      companyPrefectureMap,
      companyCityMap,
      companyAddressMap,
      ...updateData
    } = values

    let companyLogoUrl

    const existingCompany = await db.company.findUnique({
      where: { id },
      include: {
        images: true,
      },
    })

    if (!existingCompany) {
      throw new Error("企業情報が登録されていません")
    }

    // ロゴ画像の処理
    if (base64Image) {
      // 古いロゴを削除
      if (existingCompany.companyLogoUrl) {
        const publicId = extractPublicId(existingCompany.companyLogoUrl)
        await deleteCloudImage(publicId)
      }

      // 新しいロゴをアップロード
      companyLogoUrl = await createCloudImage(base64Image)
    }

    // 住所が変更された場合、緯度経度を取得
    let latitude = existingCompany.latitude
    let longitude = existingCompany.longitude

    if (
      companyPrefectureMap !== existingCompany.companyPrefectureMap ||
      companyCityMap !== existingCompany.companyCityMap ||
      companyAddressMap !== existingCompany.companyAddressMap
    ) {
      const fullAddress = `${companyPrefectureMap}${companyCityMap}${companyAddressMap}`
      const geocode = await getGeocodeFromGSI(fullAddress)
      latitude = geocode.latitude
      longitude = geocode.longitude
    }

    // 会社案内画像の処理
    const imagesToDelete = existingCompany.images.filter(
      (image) => !companyImages.some((img) => img.url === image.url)
    )

    const newImages = companyImages.filter((image) => image.isNew)

    // 削除されるべき画像の処理
    for (const image of imagesToDelete) {
      const publicId = extractPublicId(image.url)
      await deleteCloudImage(publicId)
      await db.companyImage.delete({ where: { id: image.id } })
    }

    // 新しい画像をアップロード
    const uploadedImageUrls = await Promise.all(
      newImages.map(async (image) => {
        const uploadedUrl = await createCloudImage(image.url)
        return uploadedUrl
      })
    )

    // 新しい画像を CompanyImage モデルに保存
    for (const uploadedUrl of uploadedImageUrls) {
      await db.companyImage.create({
        data: {
          companyId: id,
          url: uploadedUrl,
        },
      })
    }

    const company = await db.company.update({
      where: { id },
      data: {
        ...updateData,
        companyPrefectureMap,
        companyCityMap,
        companyAddressMap,
        latitude,
        longitude,
        companyLogoUrl: companyLogoUrl || existingCompany.companyLogoUrl,
      },
    })

    return company
  } catch (err) {
    console.error(err)
    throw new Error("企業情報の編集に失敗しました")
  }
}

export const getCompanies = async () => {
  try {
    const companies = await db.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        users: true,
      },
    })

    return companies
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getCompaniesWithMessage = async () => {
  try {
    const companies = await db.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    })

    return companies
  } catch (err) {
    console.error(err)
    return []
  }
}

type PrefectureKey = keyof typeof prefectureMapping

export const getCompaniesByPrefecture = async ({
  prefecture,
}: {
  prefecture: PrefectureKey
}) => {
  try {
    // ローマ字から漢字への変換
    const prefectureKanji = prefectureMapping[prefecture]

    if (!prefectureKanji) {
      throw new Error("地域が取得できません")
    }

    const companies = await db.company.findMany({
      where: {
        companyPrefecture: prefectureKanji,
      },
      orderBy: { createdAt: "desc" },
    })

    return companies
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getCompanyCountByPrefecture = async () => {
  const companies = await db.company.groupBy({
    by: ["companyPrefecture"],
    _count: {
      id: true,
    },
  })

  return companies.map((company) => ({
    prefecture: company.companyPrefecture,
    count: company._count.id,
  }))
}
