import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const empleados = await prisma.empleado.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(empleados)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener empleados" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, cedula, tandaLabor, porcientoComision, fechaIngreso } = body

    const empleado = await prisma.empleado.create({
      data: {
        nombre,
        cedula,
        tandaLabor,
        porcientoComision: parseFloat(porcientoComision),
        fechaIngreso: new Date(fechaIngreso),
        estado: true
      }
    })

    return NextResponse.json(empleado, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear empleado" }, { status: 500 })
  }
}

