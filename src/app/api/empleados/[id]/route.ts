import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { nombre, cedula, tandaLabor, porcientoComision, fechaIngreso, estado } = body

    const empleado = await prisma.empleado.update({
      where: { id: params.id },
      data: {
        nombre,
        cedula,
        tandaLabor,
        porcientoComision: parseFloat(porcientoComision),
        fechaIngreso: new Date(fechaIngreso),
        estado
      }
    })

    return NextResponse.json(empleado)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar empleado" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.empleado.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Empleado eliminado" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar empleado" }, { status: 500 })
  }
}

