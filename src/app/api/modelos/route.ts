import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const modelos = await prisma.modelo.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        marca: true,
        _count: { select: { vehiculos: true } }
      }
    })
    return NextResponse.json(modelos)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener modelos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { marcaId, descripcion } = body

    const modelo = await prisma.modelo.create({
      data: {
        marcaId,
        descripcion,
        estado: true
      },
      include: { marca: true }
    })

    return NextResponse.json(modelo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear modelo" }, { status: 500 })
  }
}

