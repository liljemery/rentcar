"use client"

import { useState, useEffect } from "react"

interface Vehiculo {
  id: string
  descripcion: string
  noPlaca: string
  marca: { descripcion: string }
  modelo: { descripcion: string }
}

interface Cliente {
  id: string
  nombre: string
  cedula: string
}

interface Empleado {
  id: string
  nombre: string
}

interface Renta {
  id: string
  fechaRenta: string
  fechaDevolucion?: string
  montoPorDia: number
  cantidadDias: number
  comentario?: string
  estado: string
  vehiculo: Vehiculo
  cliente: Cliente
  empleado: Empleado
}

export default function RentasPage() {
  const [rentas, setRentas] = useState<Renta[]>([])
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDevolucionModal, setShowDevolucionModal] = useState(false)
  const [selectedRenta, setSelectedRenta] = useState<Renta | null>(null)
  const [formData, setFormData] = useState({
    vehiculoId: "",
    clienteId: "",
    empleadoId: "",
    fechaRenta: new Date().toISOString().split('T')[0],
    montoPorDia: "",
    cantidadDias: "1",
    comentario: ""
  })
  const [devolucionData, setDevolucionData] = useState({
    fechaDevolucion: new Date().toISOString().split('T')[0],
    comentario: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [rentasRes, vehiculosRes, clientesRes, empleadosRes] = await Promise.all([
        fetch("/api/rentas"),
        fetch("/api/vehiculos"),
        fetch("/api/clientes"),
        fetch("/api/empleados")
      ])

      const [rentasData, vehiculosData, clientesData, empleadosData] = await Promise.all([
        rentasRes.json(),
        vehiculosRes.json(),
        clientesRes.json(),
        empleadosRes.json()
      ])

      setRentas(rentasData)
      setVehiculos(vehiculosData.filter((v: Vehiculo & { estado: boolean }) => v.estado))
      setClientes(clientesData.filter((c: Cliente & { estado: boolean }) => c.estado))
      setEmpleados(empleadosData.filter((e: Empleado & { estado: boolean }) => e.estado))
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await fetch("/api/rentas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      fetchData()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error("Error saving renta:", error)
    }
  }

  const handleDevolucion = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRenta) return

    try {
      await fetch(`/api/rentas/${selectedRenta.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...devolucionData,
          estado: "Devuelta"
        })
      })

      fetchData()
      setShowDevolucionModal(false)
      setSelectedRenta(null)
      setDevolucionData({
        fechaDevolucion: new Date().toISOString().split('T')[0],
        comentario: ""
      })
    } catch (error) {
      console.error("Error processing devolucion:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      vehiculoId: "",
      clienteId: "",
      empleadoId: "",
      fechaRenta: new Date().toISOString().split('T')[0],
      montoPorDia: "",
      cantidadDias: "1",
      comentario: ""
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar esta renta?")) {
      try {
        await fetch(`/api/rentas/${id}`, { method: "DELETE" })
        fetchData()
      } catch (error) {
        console.error("Error deleting renta:", error)
      }
    }
  }

  const openDevolucionModal = (renta: Renta) => {
    setSelectedRenta(renta)
    setDevolucionData({
      fechaDevolucion: new Date().toISOString().split('T')[0],
      comentario: renta.comentario || ""
    })
    setShowDevolucionModal(true)
  }

  const calcularTotal = (montoPorDia: number, cantidadDias: number) => {
    return (montoPorDia * cantidadDias).toFixed(2)
  }

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rentas y Devoluciones</h2>
          <p className="text-gray-600">Gestionar alquileres de vehículos</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Nueva Renta
        </button>
      </div>

      <div className="grid gap-6">
        {rentas.map((renta) => (
          <div key={renta.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {renta.vehiculo.marca.descripcion} {renta.vehiculo.modelo.descripcion} - {renta.vehiculo.noPlaca}
                </h3>
                <p className="text-sm text-gray-600">
                  Renta #{renta.id.slice(0, 8)}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                renta.estado === "Activa" ? "bg-blue-100 text-blue-800" :
                renta.estado === "Devuelta" ? "bg-green-100 text-green-800" :
                "bg-red-100 text-red-800"
              }`}>
                {renta.estado}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="font-semibold">{renta.cliente.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Empleado</p>
                <p className="font-semibold">{renta.empleado.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha Renta</p>
                <p className="font-semibold">{new Date(renta.fechaRenta).toLocaleDateString()}</p>
              </div>
              {renta.fechaDevolucion && (
                <div>
                  <p className="text-sm text-gray-600">Fecha Devolución</p>
                  <p className="font-semibold">{new Date(renta.fechaDevolucion).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Monto por día</p>
                  <p className="text-lg font-bold text-indigo-600">${renta.montoPorDia.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cantidad de días</p>
                  <p className="text-lg font-bold text-gray-900">{renta.cantidadDias}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-green-600">
                    ${calcularTotal(renta.montoPorDia, renta.cantidadDias)}
                  </p>
                </div>
              </div>
            </div>

            {renta.comentario && (
              <div className="bg-gray-50 p-3 rounded mb-4">
                <p className="text-sm text-gray-600 mb-1">Comentarios:</p>
                <p className="text-sm">{renta.comentario}</p>
              </div>
            )}

            <div className="flex gap-2">
              {renta.estado === "Activa" && (
                <button
                  onClick={() => openDevolucionModal(renta)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Procesar Devolución
                </button>
              )}
              {renta.estado === "Activa" && (
                <button
                  onClick={() => handleDelete(renta.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}

        {rentas.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500">No hay rentas registradas</p>
          </div>
        )}
      </div>

      {/* Modal Nueva Renta */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full my-8">
            <h3 className="text-2xl font-bold mb-4">Nueva Renta</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehículo
                  </label>
                  <select
                    value={formData.vehiculoId}
                    onChange={(e) => setFormData({ ...formData, vehiculoId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seleccione un vehículo</option>
                    {vehiculos.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.marca.descripcion} {v.modelo.descripcion} - {v.noPlaca}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente
                  </label>
                  <select
                    value={formData.clienteId}
                    onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seleccione un cliente</option>
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} - {c.cedula}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empleado
                  </label>
                  <select
                    value={formData.empleadoId}
                    onChange={(e) => setFormData({ ...formData, empleadoId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seleccione un empleado</option>
                    {empleados.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Renta
                  </label>
                  <input
                    type="date"
                    value={formData.fechaRenta}
                    onChange={(e) => setFormData({ ...formData, fechaRenta: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad de Días
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.cantidadDias}
                    onChange={(e) => setFormData({ ...formData, cantidadDias: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monto por Día ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.montoPorDia}
                    onChange={(e) => setFormData({ ...formData, montoPorDia: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <input
                    type="text"
                    value={formData.montoPorDia && formData.cantidadDias 
                      ? `$${calcularTotal(parseFloat(formData.montoPorDia), parseInt(formData.cantidadDias))}`
                      : "$0.00"
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    readOnly
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios
                  </label>
                  <textarea
                    value={formData.comentario}
                    onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Devolución */}
      {showDevolucionModal && selectedRenta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Procesar Devolución</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-semibold">{selectedRenta.vehiculo.marca.descripcion} {selectedRenta.vehiculo.modelo.descripcion}</p>
              <p className="text-sm text-gray-600">Cliente: {selectedRenta.cliente.nombre}</p>
            </div>
            <form onSubmit={handleDevolucion}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Devolución
                  </label>
                  <input
                    type="date"
                    value={devolucionData.fechaDevolucion}
                    onChange={(e) => setDevolucionData({ ...devolucionData, fechaDevolucion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios de Devolución
                  </label>
                  <textarea
                    value={devolucionData.comentario}
                    onChange={(e) => setDevolucionData({ ...devolucionData, comentario: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Estado del vehículo, observaciones..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Confirmar Devolución
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDevolucionModal(false)
                    setSelectedRenta(null)
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

