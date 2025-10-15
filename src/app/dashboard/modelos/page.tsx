"use client"

import { useState, useEffect } from "react"

interface Marca {
  id: string
  descripcion: string
}

interface Modelo {
  id: string
  marcaId: string
  descripcion: string
  estado: boolean
  marca: Marca
  _count?: {
    vehiculos: number
  }
}

export default function ModelosPage() {
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingModelo, setEditingModelo] = useState<Modelo | null>(null)
  const [formData, setFormData] = useState({ marcaId: "", descripcion: "", estado: true })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [modelosRes, marcasRes] = await Promise.all([
        fetch("/api/modelos"),
        fetch("/api/marcas")
      ])
      const modelosData = await modelosRes.json()
      const marcasData = await marcasRes.json()
      setModelos(modelosData)
      setMarcas(marcasData.filter((m: Marca & { estado: boolean }) => m.estado))
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingModelo) {
        await fetch(`/api/modelos/${editingModelo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch("/api/modelos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      }
      
      fetchData()
      setShowModal(false)
      setFormData({ marcaId: "", descripcion: "", estado: true })
      setEditingModelo(null)
    } catch (error) {
      console.error("Error saving modelo:", error)
    }
  }

  const handleEdit = (modelo: Modelo) => {
    setEditingModelo(modelo)
    setFormData({ marcaId: modelo.marcaId, descripcion: modelo.descripcion, estado: modelo.estado })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar este modelo?")) {
      try {
        await fetch(`/api/modelos/${id}`, { method: "DELETE" })
        fetchData()
      } catch (error) {
        console.error("Error deleting modelo:", error)
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
          <h2 className="text-2xl font-bold text-gray-900">Modelos</h2>
          <p className="text-gray-600">Gestionar modelos de vehículos por marca</p>
        </div>
        <button
          onClick={() => {
            setEditingModelo(null)
            setFormData({ marcaId: "", descripcion: "", estado: true })
            setShowModal(true)
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Nuevo Modelo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehículos
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
            {modelos.map((modelo) => (
              <tr key={modelo.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {modelo.marca.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {modelo.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {modelo._count?.vehiculos || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    modelo.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {modelo.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(modelo)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(modelo.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">
              {editingModelo ? "Editar" : "Nuevo"} Modelo
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca
                </label>
                <select
                  value={formData.marcaId}
                  onChange={(e) => setFormData({ ...formData, marcaId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Seleccione una marca</option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
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
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Activo</span>
                </label>
              </div>
              <div className="flex gap-4">
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
                    setEditingModelo(null)
                    setFormData({ marcaId: "", descripcion: "", estado: true })
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

