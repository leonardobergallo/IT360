"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">360</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/productos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Productos
            </Link>
            <Link href="/servicios" className="text-gray-700 hover:text-blue-600 transition-colors">
              Servicios
            </Link>
            <Link href="/nosotros" className="text-gray-700 hover:text-blue-600 transition-colors">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+54 9 11 1234-5678</span>
            </div>
            <Button asChild>
              <Link href="/contacto">
                <Mail className="w-4 h-4 mr-2" />
                Consultar
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/productos" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/servicios" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                href="/nosotros" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                href="/contacto" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <Phone className="w-4 h-4" />
                  <span>+54 9 11 1234-5678</span>
                </div>
                <Button asChild className="w-full">
                  <Link href="/contacto">
                    <Mail className="w-4 h-4 mr-2" />
                    Consultar
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 