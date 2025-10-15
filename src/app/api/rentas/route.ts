import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const rentas = await prisma.renta.findMany({
      orderBy: { createdAt: "desc" },
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
    return NextResponse.json(rentas)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener rentas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      empleadoId,
      vehiculoId,
      clienteId,
      fechaRenta,
      montoPorDia,
      cantidadDias,
      comentario
    } = body

    const renta = await prisma.renta.create({
      data: {
        empleadoId,
        vehiculoId,
        clienteId,
        fechaRenta: new Date(fechaRenta),
        montoPorDia: parseFloat(montoPorDia),
        cantidadDias: parseInt(cantidadDias),
        comentario,
        estado: "Activa"
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

    return NextResponse.json(renta, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear renta" }, { status: 500 })
  }
}

