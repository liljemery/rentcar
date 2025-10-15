import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const tiposVehiculos = await prisma.tipoVehiculo.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(tiposVehiculos)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tipos de vehículos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { descripcion } = body

    const tipoVehiculo = await prisma.tipoVehiculo.create({
      data: {
        descripcion,
        estado: true
      }
    })

    return NextResponse.json(tipoVehiculo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear tipo de vehículo" }, { status: 500 })
  }
}

