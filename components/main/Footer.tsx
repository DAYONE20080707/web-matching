"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import LinkButton from "@/components/ui/button/LinkButton";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface FooterProps {
  user: User | null;
}

const Footer = ({ user }: FooterProps) => {
  return (
    <div className="w-full px-3 md:max-w-[1200px] mx-auto py-10 border-t">
      <div className="flex flex-col md:flex-row justify-between text-gray-500 text-sm gap-5">
        <div className="space-y-3">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={180}
                height={36}
                priority={false}
              />
            </Link>
          </div>
          <p>株式会社デイワン</p>
          <p>107-0061 東京都港区北青山2-7-20</p>
          <p>猪瀬ビル2F</p>
          <div>
            <Image
              src="/sns/x.svg"
              alt="logo"
              width={40}
              height={40}
              priority={false}
            />
          </div>
        </div>

        <div className="space-y-6 text-center">
          <div className="space-y-3">
            {user ? (
              <>
                <div className="border border-black rounded-full px-3 py-2 md:py-1 cursor-pointer hover:bg-gray-50 max-w-[300px]">
                  {user.isAdmin ? (
                    <Link href="/admin">管理ページ</Link>
                  ) : (
                    <Link href="/member">マイページ</Link>
                  )}
                </div>
                <div
                  className="border border-black rounded-full px-3 py-2 md:py-1 cursor-pointer hover:bg-gray-50 max-w-[300px]"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  ログアウト
                </div>
              </>
            ) : (
              <div className="border border-black rounded-full px-3 py-2 md:py-1 cursor-pointer hover:bg-gray-50">
                <Link href="/login">ログイン</Link>
              </div>
            )}

            <LinkButton
              href="/contact"
              className="mx-0 flex justify-center items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              お問い合わせ
            </LinkButton>
          </div>

          <div className="space-y-3">
            <div className="mt-4 md:mt-0 hover:text-blue-500 text-left md:text-right">
              <Link href="https://day-1.tokyo/">運営会社</Link>
            </div>
            <div className=" text-left md:text-right">
              <Link href="https://day-1.tokyo/policy">
                個人情報の取り扱いについて
              </Link>
            </div>
            <div className=" text-left md:text-right">
              ©DAY ONE inc. ALL Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
