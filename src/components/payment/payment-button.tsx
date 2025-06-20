"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, MessageCircle, Loader2 } from "lucide-react"

interface PaymentButtonProps {
  product: {
    id: string
    name: string
    price: number
    description?: string
  }
}

export function PaymentButton({ product }: PaymentButtonProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: ""
  })

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{
            name: product.name,
            price: product.price,
            quantity: 1
          }],
          customer: customerData
        }),
      })

      const data = await response.json()

      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        throw new Error("Error al procesar el pago")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar el pago. Por favor, intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString()}

¿Podrían darme más información?`
    
    const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={() => setShowPaymentForm(true)}
          className="flex-1"
          disabled={isLoading}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Comprar Ahora
        </Button>
        <Button 
          variant="outline" 
          onClick={handleWhatsApp}
          className="flex-1"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Consultar
        </Button>
      </div>

      {showPaymentForm && (
        <Card>
          <CardHeader>
            <CardTitle>Información de Pago</CardTitle>
            <CardDescription>
              Completa tus datos para procesar la compra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  required
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  required
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Resumen de compra</h4>
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span className="font-bold">${product.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar con MercadoPago
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 