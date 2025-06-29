import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/formatters'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { Plus, Package, DollarSign, Eye, Edit, Trash2 } from 'lucide-react'
import { DeleteProductButton } from './_components/DeleteProductButton'

// Forzar renderizado dinámico para evitar errores de build
export const dynamic = 'force-dynamic'

async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  })
  return products
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Productos</CardTitle>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/productos/importar">Importar Productos</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/productos/nuevo">Agregar Producto</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.isActive ? 'Sí' : 'No'}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/productos/${product.id}/editar`}>
                      Editar
                    </Link>
                  </Button>
                  <DeleteProductButton productId={product.id} disabled={product._count.orderItems > 0} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 