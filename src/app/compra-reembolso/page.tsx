import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function PurchaseReembolsoPage() {
  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-yellow-100 rounded-full p-4 w-fit">
            <CheckCircle2 className="h-12 w-12 text-yellow-600" />
          </div>
          <CardTitle className="mt-4 text-2xl">¡Pedido Registrado!</CardTitle>
          <CardDescription>Tu pedido fue registrado con pago contra reembolso.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Te contactaremos para coordinar la entrega y el pago. Si tienes dudas, revisa tu email o contáctanos.
          </p>
          <Button asChild className="mt-6">
            <Link href="/productos">Seguir Comprando</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 