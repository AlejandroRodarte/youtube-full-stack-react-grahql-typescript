import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.SENDER_MAIL_USER,
    pass: process.env.SENDER_MAIL_PASSWORD
  }
})

export default transporter
