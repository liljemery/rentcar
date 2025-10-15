import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { nombre, cedula, tarjetaCR, limiteCredito, tipoPersona, estado } = body

    const cliente = await prisma.cliente.update({
      where: { id: params.id },
      data: {
        nombre,
        cedula,
        tarjetaCR,
        limiteCredito: parseFloat(limiteCredito),
        tipoPersona,
        estado
      }
    })

    return NextResponse.json(cliente)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar cliente" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.cliente.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Cliente eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar cliente" }, { status: 500 })
  }
}

