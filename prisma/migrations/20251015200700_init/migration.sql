-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "password" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TipoVehiculo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "marcaId" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Modelo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoCombustible" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vehiculo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "noChasis" TEXT NOT NULL,
    "noMotor" TEXT NOT NULL,
    "noPlaca" TEXT NOT NULL,
    "tipoVehiculoId" TEXT NOT NULL,
    "marcaId" TEXT NOT NULL,
    "modeloId" TEXT NOT NULL,
    "tipoCombustibleId" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vehiculo_tipoVehiculoId_fkey" FOREIGN KEY ("tipoVehiculoId") REFERENCES "TipoVehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehiculo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehiculo_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehiculo_tipoCombustibleId_fkey" FOREIGN KEY ("tipoCombustibleId") REFERENCES "TipoCombustible" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "tarjetaCR" TEXT,
    "limiteCredito" REAL NOT NULL DEFAULT 0,
    "tipoPersona" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "tandaLabor" TEXT NOT NULL,
    "porcientoComision" REAL NOT NULL DEFAULT 0,
    "fechaIngreso" DATETIME NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Inspeccion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehiculoId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "empleadoId" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tieneRalladuras" BOOLEAN NOT NULL DEFAULT false,
    "nivelCombustible" TEXT NOT NULL,
    "tieneGomaRespuesta" BOOLEAN NOT NULL DEFAULT true,
    "tieneGato" BOOLEAN NOT NULL DEFAULT true,
    "estadoGomas" TEXT NOT NULL,
    "observaciones" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inspeccion_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inspeccion_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inspeccion_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Renta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empleadoId" TEXT NOT NULL,
    "vehiculoId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "fechaRenta" DATETIME NOT NULL,
    "fechaDevolucion" DATETIME,
    "montoPorDia" REAL NOT NULL,
    "cantidadDias" INTEGER NOT NULL,
    "comentario" TEXT,
    "estado" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Renta_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Renta_vehiculoId_fkey" FOREIGN KEY ("vehiculoId") REFERENCES "Vehiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Renta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TipoVehiculo_descripcion_key" ON "TipoVehiculo"("descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "Marca_descripcion_key" ON "Marca"("descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "Modelo_marcaId_descripcion_key" ON "Modelo"("marcaId", "descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "TipoCombustible_descripcion_key" ON "TipoCombustible"("descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_noChasis_key" ON "Vehiculo"("noChasis");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_noMotor_key" ON "Vehiculo"("noMotor");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_noPlaca_key" ON "Vehiculo"("noPlaca");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cedula_key" ON "Cliente"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_cedula_key" ON "Empleado"("cedula");
