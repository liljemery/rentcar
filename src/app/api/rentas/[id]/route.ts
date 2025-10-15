import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { fechaDevolucion, estado, comentario } = body

    const renta = await prisma.renta.update({
      where: { id: params.id },
      data: {
        fechaDevolucion: fechaDevolucion ? new Date(fechaDevolucion) : null,
        estado,
        comentario
      },
      include: {
        vehiculo: {
          include: {
            marca: true,
            modelo: true
          }
        },
        cliente: true,
        empleado: true
      }
    })

    return NextResponse.json(renta)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar renta" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.renta.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Renta eliminada" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar renta" }, { status: 500 })
  }
}

