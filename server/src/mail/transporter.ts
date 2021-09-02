import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

const transporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.SECURE_GMAIL_CLIENT_ID,
    process.env.SECURE_GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.SECURE_GMAIL_REFRESH_TOKEN
  })

  const accessToken: string | null | undefined = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) reject(new Error('Failed to create access token.'))
      resolve(token)
    })
  })

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.SECURE_GMAIL_GOOGLE_EMAIL,
      accessToken: accessToken as string,
      clientId: process.env.SECURE_GMAIL_CLIENT_ID,
      clientSecret: process.env.SECURE_GMAIL_CLIENT_SECRET,
      refreshToken: process.env.SECURE_GMAIL_REFRESH_TOKEN
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  return transport
}

export default transporter
