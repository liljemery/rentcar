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

interface Inspeccion {
  id: string
  fecha: string
  vehiculo: Vehiculo
  cliente: Cliente
  empleado: Empleado
  tieneRalladuras: boolean
  nivelCombustible: string
  tieneGomaRespuesta: boolean
  tieneGato: boolean
  estadoGomas: string
  observaciones?: string
}

export default function InspeccionesPage() {
  const [inspecciones, setInspecciones] = useState<Inspeccion[]>([])
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    vehiculoId: "",
    clienteId: "",
    empleadoId: "",
    tieneRalladuras: false,
    nivelCombustible: "Lleno",
    tieneGomaRespuesta: true,
    tieneGato: true,
    estadoGomas: "Excelente",
    observaciones: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [inspeccionesRes, vehiculosRes, clientesRes, empleadosRes] = await Promise.all([
        fetch("/api/inspecciones"),
        fetch("/api/vehiculos"),
        fetch("/api/clientes"),
        fetch("/api/empleados")
      ])

      const [inspeccionesData, vehiculosData, clientesData, empleadosData] = await Promise.all([
        inspeccionesRes.json(),
        vehiculosRes.json(),
        clientesRes.json(),
        empleadosRes.json()
      ])

      setInspecciones(inspeccionesData)
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
      await fetch("/api/inspecciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      fetchData()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error("Error saving inspeccion:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      vehiculoId: "",
      clienteId: "",
      empleadoId: "",
      tieneRalladuras: false,
      nivelCombustible: "Lleno",
      tieneGomaRespuesta: true,
      tieneGato: true,
      estadoGomas: "Excelente",
      observaciones: ""
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar esta inspección?")) {
      try {
        await fetch(`/api/inspecciones/${id}`, { method: "DELETE" })
        fetchData()
      } catch (error) {
        console.error("Error deleting inspeccion:", error)
      }
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inspecciones de Vehículos</h2>
          <p className="text-gray-600">Registrar inspecciones pre-renta</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Nueva Inspección
        </button>
      </div>

      <div className="grid gap-6">
        {inspecciones.map((inspeccion) => (
          <div key={inspeccion.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {inspeccion.vehiculo.marca.descripcion} {inspeccion.vehiculo.modelo.descripcion} - {inspeccion.vehiculo.noPlaca}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(inspeccion.fecha).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(inspeccion.id)}
                className="text-red-600 hover:text-red-900"
              >
                Eliminar
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="font-semibold">{inspeccion.cliente.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Empleado</p>
                <p className="font-semibold">{inspeccion.empleado.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nivel Combustible</p>
                <p className="font-semibold">{inspeccion.nivelCombustible}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado Gomas</p>
                <p className="font-semibold">{inspeccion.estadoGomas}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${inspeccion.tieneRalladuras ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                {inspeccion.tieneRalladuras ? "❌ Con ralladuras" : "✅ Sin ralladuras"}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${inspeccion.tieneGomaRespuesta ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {inspeccion.tieneGomaRespuesta ? "✅ Goma de respuesta" : "❌ Sin goma de respuesta"}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${inspeccion.tieneGato ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {inspeccion.tieneGato ? "✅ Gato incluido" : "❌ Sin gato"}
              </span>
            </div>

            {inspeccion.observaciones && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600 mb-1">Observaciones:</p>
                <p className="text-sm">{inspeccion.observaciones}</p>
              </div>
            )}
          </div>
        ))}

        {inspecciones.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500">No hay inspecciones registradas</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full my-8">
            <h3 className="text-2xl font-bold mb-4">Nueva Inspección</h3>
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
                    Nivel de Combustible
                  </label>
                  <select
                    value={formData.nivelCombustible}
                    onChange={(e) => setFormData({ ...formData, nivelCombustible: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Lleno">Lleno</option>
                    <option value="3/4">3/4</option>
                    <option value="1/2">1/2</option>
                    <option value="1/4">1/4</option>
                    <option value="Vacío">Vacío</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado de Gomas
                  </label>
                  <select
                    value={formData.estadoGomas}
                    onChange={(e) => setFormData({ ...formData, estadoGomas: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="Excelente">Excelente</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                  </select>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tieneRalladuras}
                      onChange={(e) => setFormData({ ...formData, tieneRalladuras: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Tiene ralladuras</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tieneGomaRespuesta}
                      onChange={(e) => setFormData({ ...formData, tieneGomaRespuesta: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Tiene goma de respuesta</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tieneGato}
                      onChange={(e) => setFormData({ ...formData, tieneGato: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Tiene gato</span>
                  </label>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observaciones
                  </label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
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
    </div>
  )
}

