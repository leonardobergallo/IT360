import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Wrench, 
  Code, 
  Shield, 
  Wifi, 
  Monitor, 
  Database,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: 1,
    name: "Soporte Técnico",
    description: "Mantenimiento y reparación de equipos informáticos",
    longDescription: "Ofrecemos servicios completos de soporte técnico incluyendo limpieza, formateo, instalación de software, reparación de hardware y optimización de sistemas.",
    price: "Desde $8.000",
    duration: "2-4 horas",
    icon: Wrench,
    features: [
      "Limpieza de equipos",
      "Formateo e instalación de SO",
      "Reparación de hardware",
      "Optimización de rendimiento",
      "Instalación de software",
      "Backup de datos"
    ],
    category: "TECHNICAL_SUPPORT"
  },
  {
    id: 2,
    name: "Desarrollo Web",
    description: "Sitios web profesionales y aplicaciones web",
    longDescription: "Desarrollamos sitios web modernos, responsivos y optimizados para SEO. Incluimos integración con WhatsApp, pasarelas de pago y sistemas de gestión.",
    price: "Desde $80.000",
    duration: "2-4 semanas",
    icon: Code,
    features: [
      "Diseño responsivo",
      "Optimización SEO",
      "Integración WhatsApp",
      "Pasarelas de pago",
      "Panel de administración",
      "Hosting incluido"
    ],
    category: "SOFTWARE_DEVELOPMENT"
  },
  {
    id: 3,
    name: "Redes y Seguridad",
    description: "Instalación y configuración de redes empresariales",
    longDescription: "Configuramos redes WiFi empresariales, sistemas de cámaras de seguridad, backup automático y soluciones NAS para proteger tu información.",
    price: "Desde $20.000",
    duration: "1-3 días",
    icon: Shield,
    features: [
      "Configuración de routers",
      "Sistemas de cámaras",
      "Backup automático",
      "Sistemas NAS",
      "Seguridad WiFi",
      "Monitoreo remoto"
    ],
    category: "NETWORK_SETUP"
  },
  {
    id: 4,
    name: "Instalación de Software",
    description: "Configuración de programas y sistemas operativos",
    longDescription: "Instalamos y configuramos todo tipo de software: sistemas operativos, programas de oficina, antivirus, y software especializado para tu negocio.",
    price: "Desde $5.000",
    duration: "1-2 horas",
    icon: Monitor,
    features: [
      "Instalación de Windows",
      "Software de oficina",
      "Antivirus y seguridad",
      "Software especializado",
      "Configuración inicial",
      "Capacitación básica"
    ],
    category: "TECHNICAL_SUPPORT"
  },
  {
    id: 5,
    name: "Sistemas de Backup",
    description: "Soluciones de respaldo y recuperación de datos",
    longDescription: "Implementamos sistemas de backup automático tanto locales como en la nube para proteger la información crítica de tu empresa.",
    price: "Desde $15.000",
    duration: "1 día",
    icon: Database,
    features: [
      "Backup automático",
      "Respaldo en la nube",
      "Recuperación de datos",
      "Monitoreo 24/7",
      "Encriptación de datos",
      "Pruebas de restauración"
    ],
    category: "MAINTENANCE"
  },
  {
    id: 6,
    name: "Mantenimiento Preventivo",
    description: "Mantenimiento regular para prevenir problemas",
    longDescription: "Programas de mantenimiento mensual o trimestral para mantener tus equipos funcionando de manera óptima y prevenir fallas.",
    price: "Desde $4.000/mes",
    duration: "Mensual/Trimestral",
    icon: Clock,
    features: [
      "Revisión de equipos",
      "Actualización de software",
      "Limpieza preventiva",
      "Análisis de rendimiento",
      "Reportes mensuales",
      "Soporte prioritario"
    ],
    category: "MAINTENANCE"
  }
]

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Soluciones tecnológicas integrales para hacer crecer tu negocio
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-center">{service.name}</CardTitle>
                    <CardDescription className="text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        {service.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duración: {service.duration}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Incluye:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <a href="https://wa.me/5491112345678">
                          Consultar
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/servicios/${service.id}`}>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                ¿Necesitas una solución personalizada?
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Cada negocio es único. Podemos adaptar nuestros servicios a tus necesidades específicas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5491112345678">
                    Solicitar Consulta Gratuita
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">
                    Ver Más Información
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo trabajamos?
            </h2>
            <p className="text-xl text-gray-600">
              Un proceso simple y efectivo para resolver tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consulta</h3>
              <p className="text-gray-600">
                Evaluamos tus necesidades y te proponemos la mejor solución
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cotización</h3>
              <p className="text-gray-600">
                Te enviamos una propuesta detallada con precios y plazos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ejecución</h3>
              <p className="text-gray-600">
                Trabajamos en tu proyecto con la máxima calidad y profesionalismo
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte</h3>
              <p className="text-gray-600">
                Te acompañamos con soporte post-venta y mantenimiento
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 