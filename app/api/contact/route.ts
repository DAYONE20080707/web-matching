import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_TO } =
  process.env;

export async function POST(req: Request) {
  try {
    const {
      inquiryType = "",
      company,
      department = "",
      lastName,
      firstName,
      email,
      phone,
      contactMethod = "",
      message,
    } = await req.json();

    if (!company || !lastName || !firstName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "すべての必須項目を入力してください。" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: EMAIL_PORT === "465",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    let emailBody = "";

    if (inquiryType) {
      const inquiryTypeText =
        inquiryType === "general"
          ? "サイトに関するお問い合わせ"
          : inquiryType === "recruit"
          ? "求人に関するお問い合わせ"
          : "";
      emailBody += `【お問い合わせ種別】 ${inquiryTypeText}\n`;
    }

    emailBody += `会社名: ${company}\n`;
    if (department) emailBody += `部署: ${department}\n`;
    emailBody += `姓: ${lastName}\n`;
    emailBody += `名: ${firstName}\n`;
    emailBody += `メール: ${email}\n`;
    emailBody += `電話番号: ${phone}\n`;

    if (contactMethod) {
      const contactMethodTextMap: Record<string, string> = {
        email: "メール",
        phone: "電話",
        meeting: "オンラインミーティング",
      };
      const contactMethodText = contactMethodTextMap[contactMethod] || "";
      emailBody += `希望の連絡方法: ${contactMethodText}\n`;
    }

    emailBody += `メッセージ:\n${message}\n`;

    const adminMailOptions = {
      from: `"お問い合わせフォーム" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: "【お問い合わせ】新しいメッセージが届きました",
      text: emailBody,
      replyTo: email,
    };

    let userEmailBody = `${lastName} ${firstName} 様\n\nお問い合わせありがとうございます。\n以下の内容で受け付けました。\n\n------------------\n`;
    userEmailBody += emailBody;
    userEmailBody +=
      "\n------------------\n\n担当者が確認後、ご連絡いたします。\n\nよろしくお願いいたします。";

    const userMailOptions = {
      from: `"株式会社Fukaya Green Onionお問い合わせ" <${EMAIL_USER}>`,
      to: email,
      subject: "【自動返信】お問い合わせありがとうございます。",
      text: userEmailBody,
      replyTo: EMAIL_USER,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json(
      { message: "メールが正常に送信されました。" },
      { status: 200 }
    );
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json(
      { error: "メール送信に失敗しました。" },
      { status: 500 }
    );
  }
}
