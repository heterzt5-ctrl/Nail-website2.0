import "dotenv/config"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Starting Seed ---')

  const services = [
    {
      name: "The Muse Sculpt (Glass Nails)",
      name_vn: "The Muse Sculpt (Móng Thủy Tinh)",
      description: "Signature translucent glass effect with structural sculpting.",
      description_vn: "Hiệu ứng thủy tinh mờ đặc trưng với kỹ thuật điêu khắc cấu trúc.",
      price: 1200000,
      duration: 120,
      category: "Glass Nails"
    },
    {
      name: "Lineal Artistry (3D Sculpture)",
      name_vn: "Lineal Artistry (Điêu Khắc 3D)",
      description: "Avant-garde 3D textures and architectural nail art.",
      description_vn: "Kết cấu 3D tiên phong và nghệ thuật móng kiến trúc.",
      price: 1500000,
      duration: 150,
      category: "3D Art"
    },
    {
      name: "The Ritual (Recovery Spa)",
      name_vn: "The Ritual (Spa Phục Hồi)",
      description: "Deep restorative treatment for hand and nail health.",
      description_vn: "Liệu trình phục hồi sâu cho sức khỏe bàn tay và móng.",
      price: 800000,
      duration: 60,
      category: "Basic"
    }
  ]

  console.log(`Upserting ${services.length} services...`)

  for (const service of services) {
    const result = await prisma.service.upsert({
      where: { name: service.name },
      update: service,
      create: service
    })
    console.log(`+ ${result.name}`)
  }

  console.log('--- Seed Completed ---')
}

main()
  .catch((e) => {
    console.error('Seed Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
