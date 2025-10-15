# 🚗 RentCar - Sistema de Gestión de Alquiler de Vehículos

Sistema completo de gestión de alquiler de vehículos desarrollado con Next.js, TypeScript, TailwindCSS y Prisma.

## 🚀 Características

- **Landing Page atractiva y moderna** con información de la empresa
- **Sistema de autenticación** para administradores con NextAuth.js
- **Dashboard administrativo** completo con:
  - Gestión de catálogos (Tipos de vehículos, Marcas, Modelos, Tipos de combustible)
  - Gestión de vehículos
  - Gestión de clientes
  - Gestión de empleados
  - Módulo de inspecciones de vehículos
  - Módulo de rentas y devoluciones
  - Sistema de reportes con filtros avanzados

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS 4
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** NextAuth.js
- **Gestión de paquetes:** pnpm

## 📋 Requisitos Previos

- Node.js 18+ y pnpm
- Docker (para PostgreSQL)
- PostgreSQL 14+

## 🔧 Instalación

### 1. Clonar el repositorio e instalar dependencias

```bash
pnpm install
```

### 2. Configurar la base de datos

Ejecutar el contenedor de PostgreSQL:

```bash
docker run -e POSTGRES_PASSWORD=YourStrongPassw0rd -e POSTGRES_USER=postgres -e POSTGRES_DB=rentcar -p 5432:5432 --name rentcar_db -d postgres:latest
```

### 3. Configurar variables de entorno

El archivo `.env` ya está configurado con:

```env
DATABASE_URL="postgresql://postgres:YourStrongPassw0rd@localhost:5432/rentcar?schema=public"
NEXTAUTH_SECRET="tu-secret-key-super-seguro-cambiame-en-produccion"
NEXTAUTH_URL="http://localhost:3000"
```

> **Importante:** Cambia `NEXTAUTH_SECRET` en producción.

### 4. Ejecutar migraciones y seed

```bash
pnpm setup
```

Este comando ejecutará:
- Migraciones de Prisma (crea todas las tablas)
- Generación del cliente de Prisma
- Seed de la base de datos (crea usuario admin y datos iniciales)

### 5. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔑 Credenciales de Acceso

Después de ejecutar el seed, puedes iniciar sesión con:

- **Email:** admin@rentcar.com
- **Password:** admin123

## 📦 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm setup` - Ejecuta migraciones, genera Prisma y seed
- `pnpm prisma:migrate` - Ejecuta migraciones de Prisma
- `pnpm prisma:generate` - Genera el cliente de Prisma
- `pnpm prisma:seed` - Ejecuta el seed de la base de datos

## 📁 Estructura del Proyecto

```
rentcar/
├── prisma/
│   ├── schema.prisma      # Esquema de la base de datos
│   └── seed.ts            # Script de seed
├── src/
│   ├── app/
│   │   ├── api/           # API Routes
│   │   ├── dashboard/     # Panel administrativo
│   │   ├── login/         # Página de login
│   │   ├── page.tsx       # Landing page
│   │   └── layout.tsx     # Layout principal
│   ├── components/        # Componentes reutilizables
│   ├── lib/              # Utilidades y configuración
│   └── types/            # Tipos de TypeScript
└── public/               # Archivos estáticos
```

## 🗄️ Modelo de Datos

### Catálogos
- **TipoVehiculo:** Tipos de vehículos disponibles
- **Marca:** Marcas de vehículos
- **Modelo:** Modelos por marca
- **TipoCombustible:** Tipos de combustible

### Entidades Principales
- **Vehiculo:** Información completa de cada vehículo
- **Cliente:** Datos de clientes (personas físicas y jurídicas)
- **Empleado:** Información de empleados con comisiones

### Procesos
- **Inspeccion:** Inspecciones pre-renta de vehículos
- **Renta:** Gestión de alquileres y devoluciones

## 🎨 Características de la Interfaz

- Diseño responsive y moderno
- Navegación intuitiva
- Formularios con validación
- Tablas interactivas con acciones CRUD
- Sistema de filtros avanzado en reportes
- Indicadores visuales de estado
- Modales para formularios

## 🔐 Seguridad

- Autenticación con NextAuth.js
- Contraseñas hasheadas con bcrypt
- Protección de rutas con middleware
- Variables de entorno para credenciales sensibles

## 📊 Reportes y Consultas

El sistema incluye un módulo de reportes con filtros por:
- Rango de fechas
- Cliente
- Vehículo
- Estado de renta
- Tipo de vehículo

Con estadísticas en tiempo real:
- Total de rentas
- Rentas activas
- Rentas devueltas
- Ingresos totales

## 🚀 Despliegue

Para construir la aplicación para producción:

```bash
pnpm build
pnpm start
```

Asegúrate de:
1. Configurar las variables de entorno en tu servidor
2. Ejecutar las migraciones en la base de datos de producción
3. Cambiar `NEXTAUTH_SECRET` por un valor seguro

## 📝 Notas de Desarrollo

- El proyecto usa el App Router de Next.js 15
- Las rutas de API están en `src/app/api/`
- Se utiliza Server Components por defecto
- Los componentes con interactividad usan `"use client"`

## 🤝 Contribuir

Este es un proyecto académico desarrollado como parte del programa de la UNAPEC.

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

Desarrollado con ❤️ para UNAPEC
