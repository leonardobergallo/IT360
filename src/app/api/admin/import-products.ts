import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const { products } = await req.json();
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'No se recibieron productos.' }, { status: 400 });
    }

    // Validar y mapear productos
    const toCreate = products.map((p: any) => ({
      name: p.name?.toString() || 'Sin nombre',
      description: p.description?.toString() || '',
      price: parseFloat(p.price),
      stock: parseInt(p.stock) || 0,
      category: (Object.values(Category) as string[]).includes(p.category) ? p.category : Category.HARDWARE,
      isActive: p.isActive === 'false' ? false : true,
      image: p.image?.toString() || null,
    }));

    // Guardar en lote
    await prisma.product.createMany({ data: toCreate, skipDuplicates: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al importar productos:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
} 