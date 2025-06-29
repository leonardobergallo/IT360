import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'IT360 <onboarding@resend.dev>',
      to: 'info@it360.com.ar',
      subject: `Nueva consulta de ${data.name}`,
      text: `\nNombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\nEmpresa: ${data.company}\nServicio: ${data.service}\nUrgencia: ${data.urgency}\nMensaje: ${data.message}\n`
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'No se pudo enviar el email' }, { status: 500 })
  }
} 