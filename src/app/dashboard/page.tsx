"use client"

import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    { name: "Total Vehículos", value: "0", icon: "🚗", color: "bg-blue-500" },
    { name: "Clientes Activos", value: "0", icon: "👥", color: "bg-green-500" },
    { name: "Rentas Activas", value: "0", icon: "📝", color: "bg-purple-500" },
    { name: "Ingresos del Mes", value: "$0", icon: "💰", color: "bg-yellow-500" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Bienvenido, {session?.user?.name || "Admin"}
        </h2>
        <p className="text-gray-600 mt-2">
          Resumen general del sistema RentCar
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/dashboard/vehiculos"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <span className="text-3xl mr-4">🚗</span>
            <div>
              <p className="font-semibold text-gray-900">Gestionar Vehículos</p>
              <p className="text-sm text-gray-600">Ver y administrar flota</p>
            </div>
          </a>
          <a
            href="/dashboard/rentas"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <span className="text-3xl mr-4">📝</span>
            <div>
              <p className="font-semibold text-gray-900">Nueva Renta</p>
              <p className="text-sm text-gray-600">Registrar nuevo alquiler</p>
            </div>
          </a>
          <a
            href="/dashboard/clientes"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
          >
            <span className="text-3xl mr-4">👥</span>
            <div>
              <p className="font-semibold text-gray-900">Gestionar Clientes</p>
              <p className="text-sm text-gray-600">Ver y añadir clientes</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="text-center py-12 text-gray-500">
          <p>No hay actividad reciente</p>
          <p className="text-sm mt-2">Comienza registrando vehículos y rentas</p>
        </div>
      </div>
    </div>
  )
}

