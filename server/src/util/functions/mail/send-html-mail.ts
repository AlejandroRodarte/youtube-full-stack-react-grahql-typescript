import transporter from '../../../mail/transporter'
import * as MailConstants from '../../../mail/constants'

export default async function sendHtmlMail (
  to: string,
  subject: string,
  html: string
) {
  try {
    await transporter.sendMail({
      from: MailConstants.FROM,
      to,
      subject,
      html
    })
    return true
  } catch (e) {
    return false
  }
}
