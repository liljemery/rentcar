import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-slate-900 backdrop-blur-md bg-opacity-95 sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tight text-white">RENTCAR <span className="text-blue-500">PREMIUM</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#vehiculos" className="text-gray-300 hover:text-white transition-colors font-medium">Vehículos</a>
              <a href="#servicios" className="text-gray-300 hover:text-white transition-colors font-medium">Servicios</a>
              <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors font-medium">Beneficios</a>
              <a href="#contacto" className="text-gray-300 hover:text-white transition-colors font-medium">Contacto</a>
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-6 py-2.5 rounded font-semibold hover:bg-blue-700 transition-colors"
              >
                Acceder
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80" 
            alt="Luxury Car"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Experiencia Premium<br />
              <span className="text-blue-500">en Renta de Vehículos</span>
              </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
              Servicio ejecutivo diseñado para clientes que valoran la excelencia, 
              el confort y la confiabilidad en cada viaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="#reserva" 
                className="bg-blue-600 text-white px-10 py-4 rounded text-lg font-semibold hover:bg-blue-700 transition-all text-center shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Reservar Ahora
        </a>
        <a
                href="#vehiculos" 
                className="bg-white text-slate-900 px-10 py-4 rounded text-lg font-semibold hover:bg-gray-100 transition-all text-center shadow-xl"
                >
                Ver Flota
                </a>
              </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-900 text-white" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Servicios Exclusivos</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Diseñados para satisfacer las necesidades más exigentes
            </p>
                  </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Entrega a Domicilio", description: "Llevamos el vehículo donde lo necesites" },
              { title: "Chofer Ejecutivo", description: "Conductores profesionales disponibles" },
              { title: "Servicio Aeropuerto", description: "Recogida y entrega en terminal" },
              { title: "Contratos Corporativos", description: "Planes personalizados para empresas" },
            ].map((service, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-24 bg-slate-50" id="beneficios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Servicio Ejecutivo Integral</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Todo lo que necesitas para una experiencia de renta sin preocupaciones
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Seguro Completo</h3>
              <p className="text-slate-600 leading-relaxed">
                Cobertura total incluida en todas nuestras rentas. Viaja con tranquilidad y seguridad absoluta.
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Reservas Inmediatas</h3>
              <p className="text-slate-600 leading-relaxed">
                Proceso ágil y profesional. Reserva tu vehículo en minutos con confirmación instantánea.
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Asistencia 24/7</h3>
              <p className="text-slate-600 leading-relaxed">
                Soporte ejecutivo disponible en todo momento. Tu tranquilidad es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="py-24 bg-white" id="vehiculos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Flota Premium</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Vehículos de alta gama seleccionados para garantizar confort, seguridad y prestigio
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                name: "Sedanes Ejecutivos", 
                image: "https://images.unsplash.com/photo-1585503418537-88331351ad99?w=800&q=80",
                description: "Mercedes, BMW, Audi" 
              },
              { 
                name: "SUVs Premium", 
                image: "https://plus.unsplash.com/premium_photo-1664301939396-90cfdcfee181?w=800&q=80",
                description: "Range Rover, Porsche, Tesla" 
              },
              { 
                name: "Deportivos de Lujo", 
                image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
                description: "Ferrari, Lamborghini, McLaren" 
              },
            ].map((vehicle, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-80">
                  <Image 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{vehicle.name}</h3>
                    <p className="text-gray-200 mb-4">{vehicle.description}</p>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded font-semibold hover:bg-blue-700 transition-colors">
                      Ver Detalles
                </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Trust Section */}
      <section className="py-24 bg-slate-900 text-white" id="confianza">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Confianza Corporativa</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Empresas líderes confían en nuestro servicio ejecutivo
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                name: "Roberto Sánchez", 
                position: "CEO, TechCorp RD",
                text: "Servicio impecable y vehículos de primera. La opción ideal para ejecutivos que valoran la puntualidad y el profesionalismo."
              },
              { 
                name: "María Guzmán", 
                position: "Directora Regional, Global Finance",
                text: "Llevamos años trabajando con RentCar Premium. Su nivel de servicio y atención al detalle es extraordinario."
              },
              { 
                name: "Carlos Medina", 
                position: "VP Operations, Caribbean Hotels",
                text: "Para nuestros clientes VIP, solo confiamos en RentCar Premium. Nunca nos han decepcionado."
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800 p-8 rounded-lg border border-slate-700">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">&quot;{testimonial.text}&quot;</p>
                <div className="border-t border-slate-700 pt-4">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mt-16 border-t border-slate-800 pt-16">
            {[
              { number: "15+", label: "Años de Experiencia" },
              { number: "500+", label: "Clientes Corporativos" },
              { number: "100%", label: "Satisfacción Garantizada" },
              { number: "24/7", label: "Soporte Ejecutivo" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-24 bg-white" id="reserva">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Reserva Tu Vehículo</h2>
            <p className="text-xl text-slate-600">
              Completa el formulario y nuestro equipo te contactará en menos de 30 minutos
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="(809) 555-1234"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="juan@empresa.com"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Recogida</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de Devolución</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Vehículo</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                  <option>Sedán Ejecutivo</option>
                  <option>SUV Premium</option>
                  <option>Deportivo de Lujo</option>
                  <option>Van Ejecutiva</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Solicitar Reserva
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-slate-100" id="contacto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Teléfono</h3>
              <p className="text-slate-600">(809) 555-1234</p>
              <p className="text-sm text-slate-500">Lun - Dom: 24/7</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600">reservas@rentcar.com</p>
              <p className="text-sm text-slate-500">Respuesta en 30 min</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Ubicación</h3>
              <p className="text-slate-600">Santo Domingo, RD</p>
              <p className="text-sm text-slate-500">Zona Colonial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4">RENTCAR <span className="text-blue-500">PREMIUM</span></h3>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                Servicio ejecutivo de renta de vehículos de alta gama. 
                Confiabilidad, lujo y profesionalismo en cada experiencia.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
            </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Navegación</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#vehiculos" className="hover:text-white transition-colors">Flota Premium</a></li>
                <li><a href="#beneficios" className="hover:text-white transition-colors">Beneficios</a></li>
                <li><a href="#confianza" className="hover:text-white transition-colors">Testimonios</a></li>
                <li><a href="#reserva" className="hover:text-white transition-colors">Reservar</a></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Portal Admin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Legal</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Cancelación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Seguros</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; 2025 RentCar Premium. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Servicios Corporativos</a>
              <a href="#" className="hover:text-white transition-colors">Programa VIP</a>
              <a href="#" className="hover:text-white transition-colors">Soporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
