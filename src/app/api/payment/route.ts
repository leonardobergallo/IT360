import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

// Configurar MercadoPago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! 
})

interface PaymentItem {
  name: string
  price: number
  quantity: number
}

interface Customer {
  name: string
  email: string
  phone: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customer }: { items: PaymentItem[], customer: Customer } = body

    const preference = new Preference(client)

    // Crear preferencia de pago
    const preferenceData = {
      items: items.map((item: PaymentItem, index: number) => ({
        id: `item_${index + 1}`,
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'ARS',
      })),
      payer: {
        name: customer.name,
        email: customer.email,
        phone: {
          number: customer.phone,
        },
      },
      back_urls: {
        success: `${process.env.NEXTAUTH_URL}/payment/success`,
        failure: `${process.env.NEXTAUTH_URL}/payment/failure`,
        pending: `${process.env.NEXTAUTH_URL}/payment/pending`,
      },
      auto_return: 'approved',
      external_reference: `order_${Date.now()}`,
      notification_url: `${process.env.NEXTAUTH_URL}/api/payment/webhook`,
    }

    const response = await preference.create({ body: preferenceData })

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    })
  } catch (error) {
    console.error('Error creating payment preference:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
} 