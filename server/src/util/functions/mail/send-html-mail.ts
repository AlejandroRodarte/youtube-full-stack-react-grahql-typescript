import mail from '../../../mail'

export default async function sendHtmlMail (
  to: string,
  subject: string,
  html: string
) {
  try {
    const transporter = await mail.transporter()
    await transporter.sendMail({
      from: mail.MailConstants.FROM,
      to,
      subject,
      html
    })
    return true
  } catch (e) {
    if (process.env.LOG_ERRORS === 'true') console.error(e)
    return false
  }
}
