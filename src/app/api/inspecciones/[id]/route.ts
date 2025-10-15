import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inspeccion.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Inspección eliminada" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar inspección" }, { status: 500 })
  }
}

