import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(clientes)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener clientes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, cedula, tarjetaCR, limiteCredito, tipoPersona } = body

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        cedula,
        tarjetaCR,
        limiteCredito: parseFloat(limiteCredito),
        tipoPersona,
        estado: true
      }
    })

    return NextResponse.json(cliente, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear cliente" }, { status: 500 })
  }
}

