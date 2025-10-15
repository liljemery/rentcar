import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tipoVehiculo = await prisma.tipoVehiculo.findUnique({
      where: { id: params.id }
    })

    if (!tipoVehiculo) {
      return NextResponse.json({ error: "Tipo de vehículo no encontrado" }, { status: 404 })
    }

    return NextResponse.json(tipoVehiculo)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tipo de vehículo" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { descripcion, estado } = body

    const tipoVehiculo = await prisma.tipoVehiculo.update({
      where: { id: params.id },
      data: {
        descripcion,
        estado
      }
    })

    return NextResponse.json(tipoVehiculo)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar tipo de vehículo" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tipoVehiculo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Tipo de vehículo eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar tipo de vehículo" }, { status: 500 })
  }
}

