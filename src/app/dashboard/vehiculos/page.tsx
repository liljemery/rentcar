"use client"

import { useState, useEffect } from "react"

interface Catalogo {
  id: string
  descripcion: string
}

interface Vehiculo {
  id: string
  descripcion: string
  noChasis: string
  noMotor: string
  noPlaca: string
  estado: boolean
  tipoVehiculo: Catalogo
  marca: Catalogo
  modelo: Catalogo
  tipoCombustible: Catalogo
}

export default function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([])
  const [tiposVehiculos, setTiposVehiculos] = useState<Catalogo[]>([])
  const [marcas, setMarcas] = useState<Catalogo[]>([])
  const [modelos, setModelos] = useState<Catalogo[]>([])
  const [tiposCombustible, setTiposCombustible] = useState<Catalogo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null)
  const [formData, setFormData] = useState({
    descripcion: "",
    noChasis: "",
    noMotor: "",
    noPlaca: "",
    tipoVehiculoId: "",
    marcaId: "",
    modeloId: "",
    tipoCombustibleId: "",
    estado: true
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [vehiculosRes, tiposRes, marcasRes, modelosRes, combustiblesRes] = await Promise.all([
        fetch("/api/vehiculos"),
        fetch("/api/tipos-vehiculos"),
        fetch("/api/marcas"),
        fetch("/api/modelos"),
        fetch("/api/tipos-combustible")
      ])

      const [vehiculosData, tiposData, marcasData, modelosData, combustiblesData] = await Promise.all([
        vehiculosRes.json(),
        tiposRes.json(),
        marcasRes.json(),
        modelosRes.json(),
        combustiblesRes.json()
      ])

      setVehiculos(vehiculosData)
      setTiposVehiculos(tiposData.filter((t: Catalogo & { estado: boolean }) => t.estado))
      setMarcas(marcasData.filter((m: Catalogo & { estado: boolean }) => m.estado))
      setModelos(modelosData.filter((m: Catalogo & { estado: boolean }) => m.estado))
      setTiposCombustible(combustiblesData.filter((c: Catalogo & { estado: boolean }) => c.estado))
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingVehiculo) {
        await fetch(`/api/vehiculos/${editingVehiculo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch("/api/vehiculos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      }

      fetchData()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error("Error saving vehiculo:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      descripcion: "",
      noChasis: "",
      noMotor: "",
      noPlaca: "",
      tipoVehiculoId: "",
      marcaId: "",
      modeloId: "",
      tipoCombustibleId: "",
      estado: true
    })
    setEditingVehiculo(null)
  }

  const handleEdit = (vehiculo: Vehiculo) => {
    setEditingVehiculo(vehiculo)
    setFormData({
      descripcion: vehiculo.descripcion,
      noChasis: vehiculo.noChasis,
      noMotor: vehiculo.noMotor,
      noPlaca: vehiculo.noPlaca,
      tipoVehiculoId: vehiculo.tipoVehiculo.id,
      marcaId: vehiculo.marca.id,
      modeloId: vehiculo.modelo.id,
      tipoCombustibleId: vehiculo.tipoCombustible.id,
      estado: vehiculo.estado
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar este vehículo?")) {
      try {
        await fetch(`/api/vehiculos/${id}`, { method: "DELETE" })
        fetchData()
      } catch (error) {
        console.error("Error deleting vehiculo:", error)
      }
    }
  }

  const filteredModelos = modelos.filter(m => m.marca?.id === formData.marcaId)

  if (isLoading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vehículos</h2>
          <p className="text-gray-600">Gestionar flota de vehículos</p>
        </div>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Nuevo Vehículo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehículo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Placa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca/Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{vehiculo.descripcion}</div>
                  <div className="text-xs text-gray-500">
                    Ch: {vehiculo.noChasis} | Mt: {vehiculo.noMotor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                  {vehiculo.noPlaca}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.tipoVehiculo.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.marca.descripcion} {vehiculo.modelo.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    vehiculo.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {vehiculo.estado ? "Disponible" : "No disponible"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(vehiculo)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(vehiculo.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full my-8">
            <h3 className="text-2xl font-bold mb-4">
              {editingVehiculo ? "Editar" : "Nuevo"} Vehículo
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Chasis
                  </label>
                  <input
                    type="text"
                    value={formData.noChasis}
                    onChange={(e) => setFormData({ ...formData, noChasis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Motor
                  </label>
                  <input
                    type="text"
                    value={formData.noMotor}
                    onChange={(e) => setFormData({ ...formData, noMotor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Placa
                  </label>
                  <input
                    type="text"
                    value={formData.noPlaca}
                    onChange={(e) => setFormData({ ...formData, noPlaca: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Vehículo
                  </label>
                  <select
                    value={formData.tipoVehiculoId}
                    onChange={(e) => setFormData({ ...formData, tipoVehiculoId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seleccione</option>
                    {tiposVehiculos.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marca
                  </label>
                  <select
                    value={formData.marcaId}
                    onChange={(e) => setFormData({ ...formData, marcaId: e.target.value, modeloId: "" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seleccione</option>
                    {marcas.map((marca) => (
                      <option key={marca.id} value={marca.id}>{marca.descripcion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modelo
                  </label>
                  <select
                    value={formData.modeloId}
                    onChange={(e) => setFormData({ ...formData, modeloId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    disabled={!formData.marcaId}
                  >
                    <option value="">Seleccione</option>
                    {filteredModelos.map((modelo) => (
                      <option key={modelo.id} value={modelo.id}>{modelo.descripcion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Combustible
                  </label>
                  <select
                    value={formData.tipoCombustibleId}
                    onChange={(e) => setFormData({ ...formData, tipoCombustibleId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Seleccione</option>
                    {tiposCombustible.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Disponible</span>
                  </label>
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

