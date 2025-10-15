import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const tiposCombustible = await prisma.tipoCombustible.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(tiposCombustible)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener tipos de combustible" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { descripcion } = body

    const tipoCombustible = await prisma.tipoCombustible.create({
      data: {
        descripcion,
        estado: true
      }
    })

    return NextResponse.json(tipoCombustible, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear tipo de combustible" }, { status: 500 })
  }
}

