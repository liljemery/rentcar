"use client"

import { useState, useEffect } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface Vehiculo {
  id: string
  descripcion: string
  noPlaca: string
  marca: { descripcion: string }
  modelo: { descripcion: string }
  tipoVehiculo: { descripcion: string }
}

interface Cliente {
  id: string
  nombre: string
  cedula: string
}

interface Renta {
  id: string
  fechaRenta: string
  fechaDevolucion?: string
  montoPorDia: number
  cantidadDias: number
  estado: string
  vehiculo: Vehiculo
  cliente: Cliente
  empleado: { nombre: string }
}

export default function ReportesPage() {
  const [rentas, setRentas] = useState<Renta[]>([])
  const [filteredRentas, setFilteredRentas] = useState<Renta[]>([])
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    clienteId: "",
    vehiculoId: "",
    estado: "",
    tipoVehiculo: ""
  })

  const [stats, setStats] = useState({
    totalRentas: 0,
    rentasActivas: 0,
    rentasDevueltas: 0,
    ingresoTotal: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [rentas, filters])

  const fetchData = async () => {
    try {
      const [rentasRes, vehiculosRes, clientesRes] = await Promise.all([
        fetch("/api/rentas"),
        fetch("/api/vehiculos"),
        fetch("/api/clientes")
      ])

      const [rentasData, vehiculosData, clientesData] = await Promise.all([
        rentasRes.json(),
        vehiculosRes.json(),
        clientesRes.json()
      ])

      setRentas(rentasData)
      setVehiculos(vehiculosData)
      setClientes(clientesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...rentas]

    // Filtro por fecha
    if (filters.fechaInicio) {
      filtered = filtered.filter(r => 
        new Date(r.fechaRenta) >= new Date(filters.fechaInicio)
      )
    }
    if (filters.fechaFin) {
      filtered = filtered.filter(r => 
        new Date(r.fechaRenta) <= new Date(filters.fechaFin)
      )
    }

    // Filtro por cliente
    if (filters.clienteId) {
      filtered = filtered.filter(r => r.cliente.id === filters.clienteId)
    }

    // Filtro por vehículo
    if (filters.vehiculoId) {
      filtered = filtered.filter(r => r.vehiculo.id === filters.vehiculoId)
    }

    // Filtro por estado
    if (filters.estado) {
      filtered = filtered.filter(r => r.estado === filters.estado)
    }

    // Filtro por tipo de vehículo
    if (filters.tipoVehiculo) {
      filtered = filtered.filter(r => r.vehiculo.tipoVehiculo.descripcion === filters.tipoVehiculo)
    }

    setFilteredRentas(filtered)

    // Calcular estadísticas
    const totalRentas = filtered.length
    const rentasActivas = filtered.filter(r => r.estado === "Activa").length
    const rentasDevueltas = filtered.filter(r => r.estado === "Devuelta").length
    const ingresoTotal = filtered.reduce((sum, r) => 
      sum + (r.montoPorDia * r.cantidadDias), 0
    )

    setStats({
      totalRentas,
      rentasActivas,
      rentasDevueltas,
      ingresoTotal
    })
  }

  const clearFilters = () => {
    setFilters({
      fechaInicio: "",
      fechaFin: "",
      clienteId: "",
      vehiculoId: "",
      estado: "",
      tipoVehiculo: ""
    })
  }

  const exportToPDF = () => {
    setIsExporting(true)
    
    try {
      const doc = new jsPDF()
    
    // Título
    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text("RentCar - Reporte de Rentas", 14, 20)
    
    // Fecha del reporte
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generado: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 28)
    
    // Filtros aplicados
    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.text("Filtros Aplicados:", 14, 38)
    doc.setFontSize(9)
    let yPos = 44
    
    if (filters.fechaInicio) {
      doc.text(`• Fecha Inicio: ${new Date(filters.fechaInicio).toLocaleDateString()}`, 14, yPos)
      yPos += 5
    }
    if (filters.fechaFin) {
      doc.text(`• Fecha Fin: ${new Date(filters.fechaFin).toLocaleDateString()}`, 14, yPos)
      yPos += 5
    }
    if (filters.estado) {
      doc.text(`• Estado: ${filters.estado}`, 14, yPos)
      yPos += 5
    }
    if (filters.tipoVehiculo) {
      doc.text(`• Tipo de Vehículo: ${filters.tipoVehiculo}`, 14, yPos)
      yPos += 5
    }
    
    if (!filters.fechaInicio && !filters.fechaFin && !filters.estado && !filters.tipoVehiculo) {
      doc.text("• Sin filtros aplicados (Todos los registros)", 14, yPos)
      yPos += 5
    }
    
    yPos += 5
    
    // Estadísticas
    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.text("Resumen Ejecutivo:", 14, yPos)
    yPos += 8
    
    doc.setFontSize(10)
    const statsData = [
      ["Total de Rentas", stats.totalRentas.toString()],
      ["Rentas Activas", stats.rentasActivas.toString()],
      ["Rentas Devueltas", stats.rentasDevueltas.toString()],
      ["Ingresos Totales", `$${stats.ingresoTotal.toFixed(2)}`]
    ]
    
    autoTable(doc, {
      startY: yPos,
      head: [["Métrica", "Valor"]],
      body: statsData,
      theme: "grid",
      headStyles: { fillColor: [79, 70, 229] },
      margin: { left: 14 }
    })
    
    // Tabla de rentas
    const tableData = filteredRentas.map(renta => [
      `${renta.vehiculo.marca.descripcion} ${renta.vehiculo.modelo.descripcion}`,
      renta.cliente.nombre,
      new Date(renta.fechaRenta).toLocaleDateString(),
      renta.cantidadDias.toString(),
      `$${(renta.montoPorDia * renta.cantidadDias).toFixed(2)}`,
      renta.estado
    ])
    
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || yPos + 40
    
    autoTable(doc, {
      startY: finalY + 10,
      head: [["Vehículo", "Cliente", "Fecha", "Días", "Total", "Estado"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 35 },
        2: { cellWidth: 25 },
        3: { cellWidth: 15 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 }
      }
    })
    
      // Guardar PDF
      const fileName = `reporte-rentas-${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error("Error al generar PDF:", error)
      alert("Error al generar el PDF. Por favor intenta de nuevo.")
    } finally {
      setIsExporting(false)
    }
  }

  const tiposVehiculos = [...new Set(vehiculos.map(v => v.tipoVehiculo.descripcion))]

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reportes y Consultas</h2>
          <p className="text-gray-600">Analiza las rentas con filtros personalizados</p>
        </div>
        <button
          onClick={exportToPDF}
          disabled={filteredRentas.length === 0 || isExporting}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar PDF
            </>
          )}
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Total Rentas</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalRentas}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Rentas Activas</p>
          <p className="text-3xl font-bold text-blue-600">{stats.rentasActivas}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Rentas Devueltas</p>
          <p className="text-3xl font-bold text-green-600">{stats.rentasDevueltas}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Ingresos Totales</p>
          <p className="text-3xl font-bold text-purple-600">${stats.ingresoTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Inicio
            </label>
            <input
              type="date"
              value={filters.fechaInicio}
              onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Fin
            </label>
            <input
              type="date"
              value={filters.fechaFin}
              onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente
            </label>
            <select
              value={filters.clienteId}
              onChange={(e) => setFilters({ ...filters, clienteId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los clientes</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehículo
            </label>
            <select
              value={filters.vehiculoId}
              onChange={(e) => setFilters({ ...filters, vehiculoId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los vehículos</option>
              {vehiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.marca.descripcion} {v.modelo.descripcion} - {v.noPlaca}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filters.estado}
              onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los estados</option>
              <option value="Activa">Activa</option>
              <option value="Devuelta">Devuelta</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Vehículo
            </label>
            <select
              value={filters.tipoVehiculo}
              onChange={(e) => setFilters({ ...filters, tipoVehiculo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los tipos</option>
              {tiposVehiculos.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Tabla de Resultados */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Renta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Días
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRentas.map((renta) => (
                <tr key={renta.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {renta.vehiculo.marca.descripcion} {renta.vehiculo.modelo.descripcion}
                    </div>
                    <div className="text-xs text-gray-500">{renta.vehiculo.noPlaca}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {renta.cliente.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {renta.empleado.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(renta.fechaRenta).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {renta.cantidadDias}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    ${(renta.montoPorDia * renta.cantidadDias).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      renta.estado === "Activa" ? "bg-blue-100 text-blue-800" :
                      renta.estado === "Devuelta" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {renta.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRentas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron resultados con los filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  )
}

