import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const vehiculoId = searchParams.get("vehiculoId")

    const where = vehiculoId ? { vehiculoId } : {}

    const inspecciones = await prisma.inspeccion.findMany({
      where,
      orderBy: { fecha: "desc" },
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
    
    return NextResponse.json(inspecciones)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener inspecciones" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      vehiculoId,
      clienteId,
      empleadoId,
      tieneRalladuras,
      nivelCombustible,
      tieneGomaRespuesta,
      tieneGato,
      estadoGomas,
      observaciones
    } = body

    const inspeccion = await prisma.inspeccion.create({
      data: {
        vehiculoId,
        clienteId,
        empleadoId,
        tieneRalladuras,
        nivelCombustible,
        tieneGomaRespuesta,
        tieneGato,
        estadoGomas,
        observaciones,
        estado: true
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

    return NextResponse.json(inspeccion, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear inspección" }, { status: 500 })
  }
}

