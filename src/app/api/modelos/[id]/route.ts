import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { marcaId, descripcion, estado } = body

    const modelo = await prisma.modelo.update({
      where: { id: params.id },
      data: {
        marcaId,
        descripcion,
        estado
      },
      include: { marca: true }
    })

    return NextResponse.json(modelo)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar modelo" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.modelo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Modelo eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar modelo" }, { status: 500 })
  }
}

