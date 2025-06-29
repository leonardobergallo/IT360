import { Button } from "@/components/ui/button"
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
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full flex items-center justify-center text-white">
        <Image
          src="/3.jpg"
          alt="Tecnología y soluciones IT"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Soluciones IT 360
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Todo lo que tu negocio necesita en tecnología.
            Venta de equipos, soporte técnico y desarrollo de software a medida.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Button size="lg" asChild>
              <Link href="/contacto">
                <Phone className="w-5 h-5 mr-2" />
                Consultar Ahora
              </Link>
            </Button>
            <Button size="lg" variant="default" asChild>
              <Link href="/servicios">
                Ver Servicios
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50">
              <Link href="/registro">
                Registrarse
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50">
              <Link href="/admin/login">
                Iniciar Sesión
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image 
                src="/1.jpg"
                alt="Mockup de servicios en un celular"
                width={500}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div>
              <div className="mb-12 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nuestros Servicios
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Ofrecemos soluciones integrales para que tu negocio crezca con la mejor tecnología.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Venta de Equipos</h3>
                    <p className="text-gray-600">Computadoras armadas, notebooks, periféricos y equipos de red.</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">$100k - $800k</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Soporte Técnico</h3>
                    <p className="text-gray-600">Limpieza, formateo, instalación y reparación de equipos.</p>
                    <p className="text-lg font-bold text-green-600 mt-2">$8k - $40k</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Code className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Desarrollo Web</h3>
                    <p className="text-gray-600">Sitios web profesionales con WhatsApp y pasarela de pagos.</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">$80k - $500k</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Redes y Seguridad</h3>
                    <p className="text-gray-600">Instalación de redes, cámaras, backup y sistemas NAS.</p>
                    <p className="text-lg font-bold text-orange-600 mt-2">$20k - $100k</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ¿Por qué elegirnos?
                </h2>
                <p className="text-xl text-gray-600">
                  Más de 5 años de experiencia ayudando a pymes a crecer.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Garantía de Calidad</h3>
                    <p className="text-gray-600">Todos nuestros productos y servicios incluyen garantía y soporte post-venta.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Atención Personalizada</h3>
                    <p className="text-gray-600">Cada cliente es único. Adaptamos nuestras soluciones a tus necesidades específicas.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Soporte 24/7</h3>
                    <p className="text-gray-600">Estamos disponibles para resolver cualquier problema técnico cuando lo necesites.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:order-first">
              <Image 
                src="/2.jpg"
                alt="Ilustración de características y ventajas"
                width={500}
                height={500}
                className="rounded-lg"
              />
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
              <a href="https://wa.me/5493425089906">
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
