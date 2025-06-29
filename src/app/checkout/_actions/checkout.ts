'use server'

import { prisma } from '@/lib/prisma'
import { CartItem } from '@/context/CartContext'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { OrderStatus } from '@prisma/client'
import { sendWhatsAppMessage } from '@/lib/whatsapp'
import { Resend } from 'resend'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

type CheckoutData = {
  name: string
  email: string
  phone: string
  address: string
  cartItems: CartItem[]
  paymentMethod: 'mercadopago' | 'reembolso'
  userId?: string
}

export async function processCheckout({ name, email, phone, address, cartItems, paymentMethod, userId }: CheckoutData) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 1. Crear el pedido en la base de datos
  const order = await prisma.order.create({
    data: {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      total,
      status: paymentMethod === 'reembolso' ? OrderStatus.REEMBOLSO : OrderStatus.PENDING,
      notes: address,
      userId: userId || null, // Asociar al usuario si está logueado
      orderItems: {
        create: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  })

  // Notificación por WhatsApp
  const userInfo = userId ? ' (Usuario registrado)' : ' (Usuario invitado)'
  await sendWhatsAppMessage('5493425089906', `Nuevo pedido de ${name} (${email}) por $${total}. Método: ${paymentMethod === 'reembolso' ? 'Reembolso' : 'MercadoPago'}.${userInfo}`)

  // Notificación por email a ambos correos
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'IT360 <onboarding@resend.dev>',
    to: ['leonardobergallo@gmail.com', 'info@it360.com.ar'],
    subject: `Nuevo pedido de ${name}`,
    text: `Cliente: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nDirección: ${address}\nTotal: $${total}\nMétodo: ${paymentMethod === 'reembolso' ? 'REEMBOLSO' : 'MERCADOPAGO'}\nUsuario: ${userId ? 'Registrado' : 'Invitado'}`,
  })

  if (paymentMethod === 'reembolso') {
    return { success: true }
  }

  // 2. Crear la preferencia de pago en Mercado Pago
  const preference = new Preference(client)

  try {
    const preferenceResponse = await preference.create({
      body: {
        items: cartItems.map(item => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'ARS',
        })),
        back_urls: {
          success: `${process.env.NEXTAUTH_URL}/compra-exitosa`,
          failure: `${process.env.NEXTAUTH_URL}/compra-fallida`,
          pending: `${process.env.NEXTAUTH_URL}/compra-pendiente`,
        },
        auto_return: 'approved',
        external_reference: order.id, // Vinculamos la orden con el pago
        notification_url: `${process.env.NEXTAUTH_URL}/api/webhooks/mercadopago?source_news=webhooks`,
      },
    })

    return { init_point: preferenceResponse.init_point }
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', JSON.stringify(error, null, 2))
    throw new Error('Failed to create payment preference.')
  }
} 