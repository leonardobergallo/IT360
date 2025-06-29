<<<<<<< HEAD
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Loader2,
  Star,
  Zap,
  Shield,
  Headphones,
  Globe,
  Server,
  Database,
  Smartphone,
  Monitor
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  urgency: string
}

interface FormErrors {
  [key: string]: string
}

const services = [
  { value: "soporte-tecnico", label: "Soporte Técnico", icon: Headphones, description: "Asistencia técnica especializada" },
  { value: "desarrollo-web", label: "Desarrollo Web", icon: Globe, description: "Sitios web profesionales" },
  { value: "redes-seguridad", label: "Redes y Seguridad", icon: Shield, description: "Infraestructura segura" },
  { value: "venta-equipos", label: "Venta de Equipos", icon: Monitor, description: "Hardware de calidad" },
  { value: "instalacion-software", label: "Instalación de Software", icon: Server, description: "Configuración de sistemas" },
  { value: "backup", label: "Sistemas de Backup", icon: Database, description: "Protección de datos" },
  { value: "mantenimiento", label: "Mantenimiento Preventivo", icon: Zap, description: "Prevención de problemas" },
  { value: "consultoria", label: "Consultoría IT", icon: Star, description: "Asesoramiento especializado" },
  { value: "otro", label: "Otro", icon: Smartphone, description: "Servicio personalizado" }
]

const urgencyLevels = [
  { value: "baja", label: "Baja", description: "Consulta general", color: "bg-green-100 text-green-800" },
  { value: "media", label: "Media", description: "Proyecto en desarrollo", color: "bg-yellow-100 text-yellow-800" },
  { value: "alta", label: "Alta", description: "Urgente - Necesito ayuda ya", color: "bg-red-100 text-red-800" }
]

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    urgency: "media"
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email válido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres"
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Ingresa un teléfono válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('No se pudo enviar el email')

      setIsSubmitted(true)
      toast.success("¡Consulta enviada exitosamente!")
    } catch (error) {
      toast.error("Error al enviar la consulta. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleServiceSelect = (serviceValue: string) => {
    setFormData(prev => ({ ...prev, service: serviceValue }))
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Consulta enviada!
            </h2>
            <p className="text-gray-600 mb-6">
              Gracias por contactarnos. Nos pondremos en contacto contigo en menos de 24 horas.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Enviar otra consulta
              </Button>
              <Button asChild className="w-full">
                <a href="/">
                  Volver al inicio
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contacto
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hablemos de tu proyecto
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para transformar tu visión en realidad digital. 
              Nuestro equipo de expertos está listo para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="relative">
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="w-6 h-6" />
                    Envíanos tu consulta
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre y Empresa */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email y Teléfono */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="tu@email.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="+54 9 3425 08-9906"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Servicio de interés */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Servicio de interés
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((service) => {
                          const Icon = service.icon
                          return (
                            <button
                              key={service.value}
                              type="button"
                              onClick={() => handleServiceSelect(service.value)}
                              className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                                formData.service === service.value
                                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <Icon className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-gray-900">{service.label}</h4>
                                  <p className="text-sm text-gray-500">{service.description}</p>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Nivel de urgencia */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Nivel de urgencia
                      </label>
                      <div className="flex gap-3">
                        {urgencyLevels.map((urgency) => (
                          <button
                            key={urgency.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, urgency: urgency.value }))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.urgency === urgency.value
                                ? urgency.color + ' ring-2 ring-offset-2 ring-current'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {urgency.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                          errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Cuéntanos sobre tu proyecto, necesidades específicas o cualquier consulta que tengas..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Botón de envío */}
                    <Button 
                      type="submit" 
                      className="w-full py-3 text-lg font-medium" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Enviando consulta...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Consulta
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Información de contacto
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <p className="text-gray-600 text-lg">+54 9 3425 08-9906</p>
                      <p className="text-sm text-gray-500">Lun-Vie 9:00-18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600 text-lg">info@it360.com.ar</p>
                      <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ubicación</h3>
                      <p className="text-gray-600 text-lg">Espora 2680, Santa Fe Capital, Argentina</p>
                      <p className="text-sm text-gray-500">Servicio a domicilio disponible</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Horarios</h3>
                      <p className="text-gray-600 text-lg">Lunes a Viernes: 9:00 - 18:00</p>
                      <p className="text-sm text-gray-500">Sábados: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      ¿Necesitas respuesta rápida?
                    </h3>
                    <p className="text-green-100 mb-6 text-lg">
                      Escribinos por WhatsApp y te respondemos al instante
                    </p>
                    <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 font-semibold">
                      <a href="https://wa.me/5493425089906" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Chatear por WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Garantías */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">¿Por qué elegirnos?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Respuesta en menos de 24 horas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Equipo de expertos certificados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Garantía de satisfacción</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Soporte post-venta</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
=======
 
>>>>>>> 66161e13ab516d24af33f4551f88e1298d3ce09d
