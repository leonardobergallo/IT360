import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Monitor, 
  Wrench, 
  Code, 
  Shield, 
  CheckCircle, 
  Star,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Soluciones IT 360
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Todo lo que tu negocio necesita en tecnología. 
              Venta de equipos, soporte técnico y desarrollo de software a medida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contacto">
                  <Phone className="w-5 h-5 mr-2" />
                  Consultar Ahora
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/servicios">
                  Ver Servicios
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales para que tu negocio crezca con la mejor tecnología
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Venta de Equipos */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Venta de Equipos</CardTitle>
                <CardDescription>
                  Computadoras armadas, notebooks, periféricos y equipos de red
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-4">$100k - $800k</p>
                <Button asChild className="w-full">
                  <Link href="/productos">Ver Catálogo</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Soporte Técnico */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Soporte Técnico</CardTitle>
                <CardDescription>
                  Limpieza, formateo, instalación y reparación de equipos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600 mb-4">$8k - $40k</p>
                <Button asChild className="w-full">
                  <Link href="/servicios">Solicitar</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Desarrollo Web */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Desarrollo Web</CardTitle>
                <CardDescription>
                  Sitios web profesionales con WhatsApp y pasarela de pagos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600 mb-4">$80k - $500k</p>
                <Button asChild className="w-full">
                  <Link href="/servicios">Consultar</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Redes y Seguridad */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Redes y Seguridad</CardTitle>
                <CardDescription>
                  Instalación de redes, cámaras, backup y sistemas NAS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600 mb-4">$20k - $100k</p>
                <Button asChild className="w-full">
                  <Link href="/servicios">Más Info</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600">
              Más de 5 años de experiencia ayudando a pymes a crecer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600">
                Todos nuestros productos y servicios incluyen garantía y soporte post-venta
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">
                Cada cliente es único. Adaptamos nuestras soluciones a tus necesidades específicas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">
                Estamos disponibles para resolver cualquier problema técnico cuando lo necesites
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para digitalizar tu negocio?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contactanos hoy mismo y recibe una consulta gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contacto">
                <Mail className="w-5 h-5 mr-2" />
                Solicitar Consulta
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
              <a href="https://wa.me/5491112345678">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
