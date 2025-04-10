"use client"

import { QUESTIONS } from "@/lib/utils"
import { useState } from "react"
import Image from "next/image"
import ContentHeadline from "@/components/ui/text/ContentHeadline"

const TopQuestion = () => {
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null)

  const toggleQuestion = (id: string) => {
    setOpenQuestionId(openQuestionId === id ? null : id)
  }

  return (
    <div className="px-3 md:max-w-[1200px] mx-auto py-20">
      <ContentHeadline
        subTitle="よくある質問"
        mainTitle={
          <>
            <span>気になるあれこれ。</span>
            <br />
            <span>お答えします。</span>
          </>
        }
      />

      <div className="mt-10">
        {QUESTIONS.map((question) => (
          <div
            key={question.id}
            className="bg-secondary p-5 mb-3 rounded cursor-pointer"
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggleQuestion(question.id)}
            >
              <div className="flex items-center space-x-2">
                <Image
                  src="/question/icon-question.svg"
                  alt="よくある質問の質問のイラスト"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: question.question,
                  }}
                ></div>
              </div>
              <Image
                src={
                  openQuestionId === question.id
                    ? "/question/icon-minus.svg"
                    : "/question/icon-plus.svg"
                }
                alt={
                  openQuestionId === question.id
                    ? "マイナスマーク"
                    : "プラスマーク"
                }
                width="24"
                height="24"
                className="w-4 h-4"
              />
            </div>

            {openQuestionId === question.id && (
              <div className="flex items-center space-x-2 mt-5">
                <Image
                  src="/question/icon-answer.svg"
                  alt="よくある質問の答えのイラスト"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                />
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: question.answer }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopQuestion
