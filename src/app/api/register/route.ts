import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'El usuario ya existe' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Por defecto, se crea como USER. Luego lo cambiaremos a ADMIN.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER', 
      },
    });

    // Enviar email de bienvenida
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'IT360 <onboarding@resend.dev>',
        to: [email],
        subject: '¡Bienvenido a IT360!',
        text: `Hola ${name},\n\n¡Gracias por registrarte en IT360! Ya puedes acceder a tu cuenta y comenzar a comprar o hacer seguimiento de tus pedidos.\n\nSi tienes alguna duda, responde a este email.\n\n¡Saludos!\nEquipo IT360`,
      });
    } catch (err) {
      console.error('Error enviando email de bienvenida:', err);
    }

    return NextResponse.json({ message: 'Usuario creado exitosamente', user }, { status: 201 });

  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
} 