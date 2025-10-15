"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { 
      name: "Catálogos", 
      icon: "📚",
      subItems: [
        { name: "Tipos de Vehículos", href: "/dashboard/tipos-vehiculos" },
        { name: "Marcas", href: "/dashboard/marcas" },
        { name: "Modelos", href: "/dashboard/modelos" },
        { name: "Tipos de Combustible", href: "/dashboard/tipos-combustible" },
      ]
    },
    { 
      name: "Gestión", 
      icon: "🔧",
      subItems: [
        { name: "Vehículos", href: "/dashboard/vehiculos" },
        { name: "Clientes", href: "/dashboard/clientes" },
        { name: "Empleados", href: "/dashboard/empleados" },
      ]
    },
    { 
      name: "Operaciones", 
      icon: "🚗",
      subItems: [
        { name: "Inspecciones", href: "/dashboard/inspecciones" },
        { name: "Rentas", href: "/dashboard/rentas" },
      ]
    },
    { name: "Reportes", href: "/dashboard/reportes", icon: "📈" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
            <span className="text-xl font-bold">🚗 RentCar Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-gray-300">
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </div>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`block px-3 py-2 ml-8 text-sm rounded-md transition ${
                          pathname === subItem.href
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition ${
                      pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  {session?.user?.name?.[0] || "A"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{session?.user?.name || "Admin"}</p>
                  <p className="text-xs text-gray-400">{session?.user?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

