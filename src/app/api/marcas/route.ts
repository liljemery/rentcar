import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const marcas = await prisma.marca.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { modelos: true, vehiculos: true } } }
    })
    return NextResponse.json(marcas)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener marcas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { descripcion } = body

    const marca = await prisma.marca.create({
      data: {
        descripcion,
        estado: true
      }
    })

    return NextResponse.json(marca, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear marca" }, { status: 500 })
  }
}

