import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Laptop, Mouse, Keyboard, Wifi, Printer, HardDrive, Cpu } from "lucide-react"
import { PaymentButton } from "@/components/payment/payment-button"
import Link from "next/link"

const products = [
  {
    id: "1",
    name: "PC Gamer Armada",
    description: "Intel i5, 16GB RAM, GTX 1660, SSD 500GB",
    price: 450000,
    category: "HARDWARE",
    image: "/pc-gamer.jpg",
    stock: 5,
    icon: Monitor
  },
  {
    id: "2",
    name: "Notebook HP Pavilion",
    description: "Intel i3, 8GB RAM, SSD 256GB, 15.6\"",
    price: 280000,
    category: "HARDWARE",
    image: "/notebook.jpg",
    stock: 3,
    icon: Laptop
  },
  {
    id: "3",
    name: "Mouse Gaming RGB",
    description: "6 botones, 12000 DPI, RGB personalizable",
    price: 15000,
    category: "PERIPHERALS",
    image: "/mouse.jpg",
    stock: 20,
    icon: Mouse
  },
  {
    id: "4",
    name: "Teclado Mecánico",
    description: "Switches Blue, RGB, teclas numéricas",
    price: 25000,
    category: "PERIPHERALS",
    image: "/keyboard.jpg",
    stock: 15,
    icon: Keyboard
  },
  {
    id: "5",
    name: "Router WiFi 6",
    description: "Dual Band, 3000Mbps, 4 antenas",
    price: 35000,
    category: "NETWORK",
    image: "/router.jpg",
    stock: 8,
    icon: Wifi
  },
  {
    id: "6",
    name: "Impresora Multifunción",
    description: "Láser, WiFi, escáner, copiadora",
    price: 85000,
    category: "PERIPHERALS",
    image: "/printer.jpg",
    stock: 4,
    icon: Printer
  },
  {
    id: "7",
    name: "Disco Externo 2TB",
    description: "USB 3.0, portátil, compatible con PC/Mac",
    price: 18000,
    category: "HARDWARE",
    image: "/hdd.jpg",
    stock: 12,
    icon: HardDrive
  },
  {
    id: "8",
    name: "Procesador Intel i7",
    description: "10ma generación, 8 núcleos, 4.9GHz",
    price: 120000,
    category: "HARDWARE",
    image: "/cpu.jpg",
    stock: 6,
    icon: Cpu
  }
]

const categories = [
  { name: "Todos", value: "ALL" },
  { name: "Hardware", value: "HARDWARE" },
  { name: "Periféricos", value: "PERIPHERALS" },
  { name: "Redes", value: "NETWORK" }
]

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Equipos de calidad, periféricos y componentes para tu negocio
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant="outline"
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const IconComponent = product.icon
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      ${product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Stock: {product.stock} unidades
                    </p>
                    <PaymentButton product={product} />
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                ¿No encontrás lo que buscás?
              </h2>
              <p className="text-gray-600 mb-6">
                Podemos armar equipos a medida según tus necesidades específicas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="https://wa.me/5491112345678">
                    Consultar por WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacto">
                    Solicitar Cotización
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 