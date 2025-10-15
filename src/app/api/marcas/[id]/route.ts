import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const marca = await prisma.marca.findUnique({
      where: { id: params.id }
    })

    if (!marca) {
      return NextResponse.json({ error: "Marca no encontrada" }, { status: 404 })
    }

    return NextResponse.json(marca)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener marca" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { descripcion, estado } = body

    const marca = await prisma.marca.update({
      where: { id: params.id },
      data: {
        descripcion,
        estado
      }
    })

    return NextResponse.json(marca)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar marca" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.marca.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Marca eliminada" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar marca" }, { status: 500 })
  }
}

