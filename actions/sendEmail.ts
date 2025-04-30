import nodemailer from "nodemailer"

// SMTPサーバの設定
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  pool: true,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL!,
    pass: process.env.EMAIL_PASSWORD!,
  },
})

// メール送信
export const sendEmail = async (
  subject: string,
  body: string,
  sendTo: string
) => {
  const mailOptions = {
    // 送信元
    from: `DAY ONE <${process.env.EMAIL}>`,
    // 送信先
    to: sendTo,
    // 件名
    subject: subject,
    // 本文
    html: body,
  }

  // メール送信
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error)
    }
  })
}
