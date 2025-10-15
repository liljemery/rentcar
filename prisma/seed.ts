import { prisma } from "../src/lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...")

  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash("admin123", 10)
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@rentcar.com" },
    update: {},
    create: {
      email: "admin@rentcar.com",
      name: "Administrador",
      password: hashedPassword,
      role: "admin",
    },
  })

  console.log("✅ Usuario administrador creado:")
  console.log("   Email: admin@rentcar.com")
  console.log("   Password: admin123")

  // Crear tipos de vehículos
  const tiposVehiculos = ["Automóvil", "Camioneta", "SUV", "Furgoneta", "Pickup"]
  for (const tipo of tiposVehiculos) {
    await prisma.tipoVehiculo.upsert({
      where: { descripcion: tipo },
      update: {},
      create: { descripcion: tipo, estado: true }
    })
  }
  console.log("✅ Tipos de vehículos creados")

  // Crear tipos de combustible
  const tiposCombustible = ["Gasolina", "Gasoil", "Gas Natural", "Eléctrico", "Híbrido"]
  for (const tipo of tiposCombustible) {
    await prisma.tipoCombustible.upsert({
      where: { descripcion: tipo },
      update: {},
      create: { descripcion: tipo, estado: true }
    })
  }
  console.log("✅ Tipos de combustible creados")

  // Crear marcas
  const marcas = ["Toyota", "Honda", "Kia", "Hyundai", "Ford", "Chevrolet", "Nissan"]
  for (const marca of marcas) {
    await prisma.marca.upsert({
      where: { descripcion: marca },
      update: {},
      create: { descripcion: marca, estado: true }
    })
  }
  console.log("✅ Marcas creadas")

  console.log("\n🎉 Seed completado exitosamente!")
  console.log("\n📌 Puedes iniciar sesión con:")
  console.log("   Email: admin@rentcar.com")
  console.log("   Password: admin123")
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

