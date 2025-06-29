import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import { ArrowRight, Wrench, Code, Shield, Monitor, Cloud, Zap, Headphones, Star, Globe, Database } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Service } from '@prisma/client'

// Forzar renderizado dinámico para evitar errores de build
export const dynamic = 'force-dynamic'

const CATEGORY_MAP = {
  'SOPORTE': { label: 'Soporte Técnico', color: 'bg-blue-100 text-blue-800', icon: Wrench },
  'DESARROLLO': { label: 'Desarrollo', color: 'bg-green-100 text-green-800', icon: Code },
  'REDES': { label: 'Redes y Seguridad', color: 'bg-purple-100 text-purple-800', icon: Shield },
  'CLOUD': { label: 'Cloud', color: 'bg-cyan-100 text-cyan-800', icon: Cloud },
  'BACKUP': { label: 'Backup', color: 'bg-yellow-100 text-yellow-800', icon: Database },
  'CONSULTORIA': { label: 'Consultoría', color: 'bg-pink-100 text-pink-800', icon: Star },
  'OTRO': { label: 'Otro', color: 'bg-gray-100 text-gray-800', icon: Monitor },
}

async function getServices(): Promise<Service[]> {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  })
  return services
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full flex items-center justify-center text-white">
        <Image
          src="/2.jpg"
          alt="Servicios de tecnología"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Servicios IT360
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-100 drop-shadow">
            Soluciones integrales para tu empresa: soporte, desarrollo, redes, cloud y más. ¡Impulsá tu negocio con tecnología de verdad!
          </p>
        </div>
      </section>

      {/* Servicios */}
      <div className="container py-16 md:py-24">
        {services.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            No hay servicios disponibles en este momento. Vuelve a consultar pronto.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service: Service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                description={service.description}
                price={service.price}
                image={'image' in service ? (service as any).image : undefined}
                category={'category' in service ? (service as any).category : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para llevar tu empresa al siguiente nivel?</h2>
        <p className="text-lg mb-8">Contactanos y recibí asesoría gratuita para elegir el servicio ideal para tu negocio.</p>
        <Button asChild size="lg" className="text-lg font-semibold bg-white text-blue-700 hover:bg-blue-50">
          <Link href="/contacto">
            Solicitar Asesoría <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <FAQ
            question="¿Qué tipo de soporte ofrecen?"
            answer="Ofrecemos soporte técnico remoto y presencial, mantenimiento preventivo y correctivo, y asistencia en emergencias."
          />
          <FAQ
            question="¿Pueden desarrollar software a medida?"
            answer="Sí, contamos con un equipo de desarrollo para crear soluciones web, apps y sistemas personalizados."
          />
          <FAQ
            question="¿Trabajan con empresas de cualquier tamaño?"
            answer="Sí, nuestros servicios se adaptan tanto a pymes como a grandes empresas."
          />
          <FAQ
            question="¿Qué garantías ofrecen?"
            answer="Garantía de satisfacción, soporte post-venta y atención personalizada en cada proyecto."
          />
        </div>
      </section>
    </>
  )
}

type ServiceCardProps = {
  id: string
  name: string
  description: string | null
  price: number
  image?: string | null
  category?: string
}

function getServiceExamples(name: string) {
  switch (name.toLowerCase()) {
    case 'desarrollo de sitios web':
      return [
        'Tienda online para emprendimientos',
        'Landing page para eventos o lanzamientos',
        'Blog profesional o personal',
        'Sitio institucional para empresas',
        'Integración con WhatsApp y MercadoPago',
        'Catálogo de productos o servicios',
        'Portal de reservas online',
        'Web para profesionales independientes',
        'Rediseño de sitios antiguos',
        'Webs autoadministrables (WordPress, CMS)',
      ];
    case 'instalación de redes':
      return [
        'Red WiFi para oficinas y coworkings',
        'Cableado estructurado para empresas',
        'Optimización de señal WiFi en hogares grandes',
        'Instalación de cámaras de seguridad conectadas a la red',
        'Configuración de routers y repetidores',
        'Segmentación de red para invitados y empleados',
        'Instalación de puntos de red en locales comerciales',
        'Redes para eventos temporales',
        'Soluciones de backup de red',
        'Diagnóstico y solución de problemas de conectividad',
      ];
    case 'soporte técnico':
      return [
        'Formateo y limpieza de computadoras lentas',
        'Eliminación de virus y malware',
        'Recuperación de archivos borrados',
        'Instalación de programas y drivers',
        'Armado y actualización de PC gamer',
        'Mantenimiento preventivo para empresas',
        'Reparación de notebooks y PCs',
        'Asistencia remota para emergencias',
        'Configuración de impresoras y periféricos',
        'Soporte para software de gestión y contabilidad',
        'Reparación de PC de escritorio y notebooks a domicilio',
      ];
    case 'venta de equipos':
      return [
        'PCs armadas a medida para oficina o gaming',
        'Notebooks para estudiantes y profesionales',
        'Impresoras y periféricos',
        'Equipos de red: routers, switches, cámaras IP',
        'Monitores y accesorios',
        'Kits de videollamadas y home office',
        'Servidores y NAS para empresas',
        'Tablets y dispositivos móviles',
        'Equipos reacondicionados con garantía',
        'Asesoramiento para compra de hardware',
      ];
    default:
      return ['Consultá para un caso a medida'];
  }
}

function ServiceCard({ id, name, description, price, image, category }: ServiceCardProps) {
  const ejemplos = getServiceExamples(name);
  return (
    <Card className="group shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg bg-gray-200 flex items-center justify-center">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 text-center flex items-center gap-2 mb-2">
        {name}
        {category && (
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
            {category}
          </span>
        )}
      </h3>
      <p className="text-gray-600 text-center text-sm mb-2 min-h-[48px]">{description}</p>
      <ul className="text-xs text-gray-700 mb-4 list-disc list-inside text-left w-full max-w-xs mx-auto">
        {ejemplos.map((ej, i) => (
          <li key={i}>{ej}</li>
        ))}
      </ul>
      <span className="text-2xl font-extrabold text-violet-700 mb-2 text-center">${price}</span>
      <Button asChild size="sm" className="mt-2 w-full">
        <Link href={`/presupuesto?servicio=${encodeURIComponent(name)}`}>
          Solicitar Presupuesto
        </Link>
      </Button>
    </Card>
  )
}

function FAQ({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow flex flex-col gap-2">
      <span className="font-semibold text-blue-700">{question}</span>
      <span className="text-gray-700">{answer}</span>
    </div>
  )
} 