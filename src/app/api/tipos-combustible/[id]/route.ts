import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { descripcion, estado } = body

    const tipoCombustible = await prisma.tipoCombustible.update({
      where: { id: params.id },
      data: {
        descripcion,
        estado
      }
    })

    return NextResponse.json(tipoCombustible)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar tipo de combustible" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tipoCombustible.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Tipo de combustible eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar tipo de combustible" }, { status: 500 })
  }
}

