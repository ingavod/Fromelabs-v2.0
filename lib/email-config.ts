import nodemailer from 'nodemailer'

// Configuración del transporter SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.buzondecorreo.com',
  port: 465,
  secure: true, // true para puerto 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Verificar conexión SMTP
export async function verifyEmailConnection() {
  try {
    await transporter.verify()
    console.log('✅ Conexión SMTP verificada correctamente')
    return true
  } catch (error) {
    console.error('❌ Error en conexión SMTP:', error)
    return false
  }
}

// Función helper para enviar emails
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  try {
    const info = await transporter.sendMail({
      from: `"From E Labs" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })

    console.log('✅ Email enviado:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('❌ Error enviando email:', error)
    return { success: false, error: error.message }
  }
}
