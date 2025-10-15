import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const vehiculos = await prisma.vehiculo.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        tipoVehiculo: true,
        marca: true,
        modelo: true,
        tipoCombustible: true
      }
    })
    return NextResponse.json(vehiculos)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener vehículos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      descripcion,
      noChasis,
      noMotor,
      noPlaca,
      tipoVehiculoId,
      marcaId,
      modeloId,
      tipoCombustibleId
    } = body

    const vehiculo = await prisma.vehiculo.create({
      data: {
        descripcion,
        noChasis,
        noMotor,
        noPlaca,
        tipoVehiculoId,
        marcaId,
        modeloId,
        tipoCombustibleId,
        estado: true
      },
      include: {
        tipoVehiculo: true,
        marca: true,
        modelo: true,
        tipoCombustible: true
      }
    })

    return NextResponse.json(vehiculo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear vehículo" }, { status: 500 })
  }
}

