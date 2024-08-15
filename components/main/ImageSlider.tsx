"use client"

import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ImageSliderProps {
  imageUrls: string[]
}

const ImageSlider = ({ imageUrls }: ImageSliderProps) => {
  const slideSettings = {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{
        clickable: true,
      }}
      className="max-w-full"
    >
      {imageUrls.map((src: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            width={512}
            height={288}
            alt="Slider Image"
            loading="eager"
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlider
