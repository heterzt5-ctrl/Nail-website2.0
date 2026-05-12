import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('--- Starting Seed ---')

  // Clear existing to avoid leftovers
  await prisma.appointment.deleteMany({})
  await prisma.service.deleteMany({})

  const services = [
    // Manicure & Pedicure
    {
      name: "Classic Manicure",
      name_vn: "Chăm sóc móng cơ bản",
      description: "Essential nail care, cuticle work, and shaping.",
      description_vn: "Chăm sóc móng thiết yếu, nhặt da và tạo form.",
      price: 200000,
      duration: 45,
      category: "Manicure & Pedicure"
    },
    {
      name: "Regular Polish",
      name_vn: "Sơn thường",
      description: "Standard nail polish application.",
      description_vn: "Sơn móng tay cơ bản.",
      price: 150000,
      duration: 30,
      category: "Manicure & Pedicure"
    },
    {
      name: "Gel Polish",
      name_vn: "Sơn Gel",
      description: "Long-lasting gel polish.",
      description_vn: "Sơn gel giữ màu lâu phai.",
      price: 300000,
      duration: 45,
      category: "Manicure & Pedicure"
    },
    {
      name: "Cat Eye",
      name_vn: "Sơn mắt mèo",
      description: "Magnetic cat eye gel effect.",
      description_vn: "Hiệu ứng sơn gel mắt mèo từ tính.",
      price: 400000,
      duration: 60,
      category: "Manicure & Pedicure"
    },

    // Basic Designs
    {
      name: "Full French Tip",
      name_vn: "French toàn bộ",
      description: "Classic or modern French tips on all nails.",
      description_vn: "Viền móng French cổ điển hoặc hiện đại.",
      price: 500000,
      duration: 60,
      category: "Basic Designs"
    },
    {
      name: "Full Ombre",
      name_vn: "Ombre toàn bộ",
      description: "Smooth gradient color transition.",
      description_vn: "Chuyển màu gradient mượt mà.",
      price: 500000,
      duration: 75,
      category: "Basic Designs"
    },
    {
      name: "Full Chrome",
      name_vn: "Tráng gương toàn bộ",
      description: "Metallic chrome finish.",
      description_vn: "Hiệu ứng tráng gương toàn bộ móng.",
      price: 600000,
      duration: 75,
      category: "Basic Designs"
    },
    {
      name: "Full Cat Eye",
      name_vn: "Mắt mèo toàn bộ",
      description: "Intense magnetic cat eye on all nails.",
      description_vn: "Sơn mắt mèo toàn bộ các ngón.",
      price: 600000,
      duration: 75,
      category: "Basic Designs"
    },

    // Hair Wash & Relaxation
    {
      name: "Classic Shampoo",
      name_vn: "Gội đầu cơ bản",
      description: "Standard relaxing hair wash.",
      description_vn: "Gội đầu thư giãn cơ bản.",
      price: 150000,
      duration: 30,
      category: "Hair Wash & Relaxation"
    },
    {
      name: "Deluxe Shampoo",
      name_vn: "Gội đầu dưỡng sinh",
      description: "Deep scalp massage and hair nourishment.",
      description_vn: "Gội đầu kết hợp massage da đầu.",
      price: 250000,
      duration: 45,
      category: "Hair Wash & Relaxation"
    },
    {
      name: "Luxury Shampoo",
      name_vn: "Gội đầu hoàng gia",
      description: "Ultimate relaxation with neck and shoulder massage.",
      description_vn: "Gội đầu thư giãn hoàng gia kết hợp massage cổ vai gáy.",
      price: 400000,
      duration: 60,
      category: "Hair Wash & Relaxation"
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
