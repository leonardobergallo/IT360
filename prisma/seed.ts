import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@it360.com.ar' },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('password123', 10)

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@it360.com.ar',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    console.log('Admin user created.')
  } else {
    console.log('Admin user already exists.')
  }

  // Puedes añadir más datos de seed aquí si lo necesitas

  console.log('Seeding finished.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 