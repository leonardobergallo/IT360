import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { nombre, email, telefono, servicio, descripcion } = await req.json();
    if (!nombre || !email || !servicio || !descripcion) {
      return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'IT360 <onboarding@resend.dev>',
      to: ['info@it360.com.ar', 'leonardobergallo@gmail.com'],
      subject: `Nueva solicitud de presupuesto: ${servicio}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nServicio: ${servicio}\n\nDescripción:\n${descripcion}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al enviar presupuesto:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
} 