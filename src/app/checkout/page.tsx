'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatters'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { processCheckout } from './_actions/checkout'
import { useSession } from 'next-auth/react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, LogIn, UserPlus } from 'lucide-react'

export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'reembolso'>('mercadopago')
  const [address, setAddress] = useState('')

  // Autocompletar datos si el usuario está logueado
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session])

  useEffect(() => {
    if (cartCount === 0 && !isPending) {
      router.replace('/')
    }
  }, [cartCount, router, isPending])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cartCount === 0) {
    return null
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) {
      alert('La dirección de entrega es obligatoria')
      return
    }
    startTransition(async () => {
      try {
        const result = await processCheckout({ 
          name, 
          email, 
          phone, 
          address, 
          cartItems, 
          paymentMethod,
          userId: session?.user?.id // Pasar el ID del usuario si está logueado
        })
        if (paymentMethod === 'mercadopago' && result.init_point) {
          clearCart()
          window.location.href = result.init_point
        } else if (paymentMethod === 'reembolso' && result.success) {
          clearCart()
          router.replace('/compra-reembolso')
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error)
        alert('Hubo un error al intentar procesar el pago. Por favor, intenta de nuevo.')
      }
    })
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      {/* Mensaje para usuarios no logueados */}
      {status === 'unauthenticated' && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <User className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            <div className="flex items-center justify-between">
              <span>¿Tienes una cuenta? Inicia sesión para autocompletar tus datos y hacer seguimiento de tus pedidos.</span>
              <div className="flex gap-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => router.push('/admin/login')}
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => router.push('/registro')}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Registrarse
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Mensaje para usuarios logueados */}
      {status === 'authenticated' && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <User className="h-4 w-4" />
          <AlertDescription className="text-green-800">
            ¡Hola {session.user.name}! Tus datos han sido autocompletados. Tu pedido se asociará a tu cuenta.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Tus Datos
                {status === 'authenticated' && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Logueado
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    required 
                    disabled={isPending || status === 'loading'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de entrega *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    placeholder="Calle, número, ciudad, provincia"
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Método de Pago</Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${paymentMethod === 'mercadopago' ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
                      onClick={() => setPaymentMethod('mercadopago')}
                      disabled={isPending || status === 'loading'}
                    >
                      💳 MercadoPago
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${paymentMethod === 'reembolso' ? 'bg-green-600 text-white border-green-600 shadow-lg scale-105' : 'bg-white text-green-600 border-green-200 hover:bg-green-50'}`}
                      onClick={() => setPaymentMethod('reembolso')}
                      disabled={isPending || status === 'loading'}
                    >
                      💵 Reembolso
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full mt-4" 
                  disabled={isPending || status === 'loading'}
                >
                  {isPending ? 'Procesando...' : paymentMethod === 'mercadopago' ? 'Pagar con Mercado Pago' : 'Finalizar Pedido'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 