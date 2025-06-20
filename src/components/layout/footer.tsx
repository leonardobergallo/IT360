import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IT</span>
              </div>
              <span className="text-xl font-bold">360</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Soluciones informáticas integrales para pymes y profesionales. 
              Venta de equipos, soporte técnico y desarrollo de software a medida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/5491112345678" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-white transition-colors">
                  Soporte Técnico
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-white transition-colors">
                  Venta de Equipos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-white transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-300 hover:text-white transition-colors">
                  Redes y Seguridad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+54 9 11 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">info@it360.com.ar</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Lun-Vie 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 IT360. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
} 