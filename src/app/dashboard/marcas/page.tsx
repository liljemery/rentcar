"use client"

import { useState, useEffect } from "react"

interface Marca {
  id: string
  descripcion: string
  estado: boolean
  _count?: {
    modelos: number
    vehiculos: number
  }
}

export default function MarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMarca, setEditingMarca] = useState<Marca | null>(null)
  const [formData, setFormData] = useState({ descripcion: "", estado: true })

  useEffect(() => {
    fetchMarcas()
  }, [])

  const fetchMarcas = async () => {
    try {
      const response = await fetch("/api/marcas")
      const data = await response.json()
      setMarcas(data)
    } catch (error) {
      console.error("Error fetching marcas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingMarca) {
        await fetch(`/api/marcas/${editingMarca.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch("/api/marcas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
      }
      
      fetchMarcas()
      setShowModal(false)
      setFormData({ descripcion: "", estado: true })
      setEditingMarca(null)
    } catch (error) {
      console.error("Error saving marca:", error)
    }
  }

  const handleEdit = (marca: Marca) => {
    setEditingMarca(marca)
    setFormData({ descripcion: marca.descripcion, estado: marca.estado })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Está seguro de eliminar esta marca?")) {
      try {
        await fetch(`/api/marcas/${id}`, { method: "DELETE" })
        fetchMarcas()
      } catch (error) {
        console.error("Error deleting marca:", error)
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
          <h2 className="text-2xl font-bold text-gray-900">Marcas</h2>
          <p className="text-gray-600">Gestionar marcas de vehículos</p>
        </div>
        <button
          onClick={() => {
            setEditingMarca(null)
            setFormData({ descripcion: "", estado: true })
            setShowModal(true)
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Nueva Marca
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modelos
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
            {marcas.map((marca) => (
              <tr key={marca.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {marca.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {marca._count?.modelos || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {marca._count?.vehiculos || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    marca.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {marca.estado ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(marca)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(marca.id)}
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
              {editingMarca ? "Editar" : "Nueva"} Marca
            </h3>
            <form onSubmit={handleSubmit}>
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
                    setEditingMarca(null)
                    setFormData({ descripcion: "", estado: true })
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

