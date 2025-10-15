import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehiculo = await prisma.vehiculo.findUnique({
      where: { id: params.id },
      include: {
        tipoVehiculo: true,
        marca: true,
        modelo: true,
        tipoCombustible: true
      }
    })

    if (!vehiculo) {
      return NextResponse.json({ error: "Vehículo no encontrado" }, { status: 404 })
    }

    return NextResponse.json(vehiculo)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener vehículo" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      tipoCombustibleId,
      estado
    } = body

    const vehiculo = await prisma.vehiculo.update({
      where: { id: params.id },
      data: {
        descripcion,
        noChasis,
        noMotor,
        noPlaca,
        tipoVehiculoId,
        marcaId,
        modeloId,
        tipoCombustibleId,
        estado
      },
      include: {
        tipoVehiculo: true,
        marca: true,
        modelo: true,
        tipoCombustible: true
      }
    })

    return NextResponse.json(vehiculo)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar vehículo" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.vehiculo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Vehículo eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar vehículo" }, { status: 500 })
  }
}

