"use client"

import { useState, useEffect } from "react"

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

  const tiposVehiculos = [...new Set(vehiculos.map(v => v.tipoVehiculo.descripcion))]

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reportes y Consultas</h2>
        <p className="text-gray-600">Analiza las rentas con filtros personalizados</p>
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

