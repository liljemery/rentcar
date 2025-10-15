import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">🚗 RentCar</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#vehiculos" className="text-gray-700 hover:text-indigo-600 transition">Vehículos</a>
              <a href="#servicios" className="text-gray-700 hover:text-indigo-600 transition">Servicios</a>
              <a href="#testimonios" className="text-gray-700 hover:text-indigo-600 transition">Testimonios</a>
              <a href="#contacto" className="text-gray-700 hover:text-indigo-600 transition">Contacto</a>
              <Link 
                href="/login" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Alquila el vehículo <span className="text-indigo-600">perfecto</span> para tu viaje
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                La mejor experiencia de alquiler de vehículos en República Dominicana. 
                Vehículos modernos, precios competitivos y servicio excepcional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#vehiculos" 
                  className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition text-center"
                >
                  Ver Vehículos
        </a>
        <a
                  href="#contacto" 
                  className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition text-center"
                >
                  Contáctanos
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 transform rotate-3 shadow-2xl">
                <div className="bg-white rounded-xl p-6 transform -rotate-3">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚙</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Más de 100+ Vehículos</h3>
                    <p className="text-gray-600">Disponibles para ti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h2>
            <p className="text-xl text-gray-600">Brindamos el mejor servicio de alquiler de vehículos</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Precios Competitivos</h3>
              <p className="text-gray-600">
                Los mejores precios del mercado sin comprometer la calidad de nuestro servicio.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Vehículos Modernos</h3>
              <p className="text-gray-600">
                Flota de vehículos nuevos y bien mantenidos para garantizar tu seguridad.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Servicio 24/7</h3>
              <p className="text-gray-600">
                Atención al cliente disponible las 24 horas del día, los 7 días de la semana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-20 bg-gray-50" id="vehiculos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Flota</h2>
            <p className="text-xl text-gray-600">Encuentra el vehículo ideal para tus necesidades</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Económicos", emoji: "🚗", price: "desde $35/día" },
              { name: "SUVs", emoji: "🚙", price: "desde $65/día" },
              { name: "Camionetas", emoji: "🛻", price: "desde $85/día" },
              { name: "Vans", emoji: "🚐", price: "desde $95/día" },
            ].map((vehicle, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="text-6xl mb-4 text-center">{vehicle.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{vehicle.name}</h3>
                <p className="text-indigo-600 font-semibold text-center">{vehicle.price}</p>
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" id="testimonios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-gray-600">Miles de clientes satisfechos</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "María González", text: "Excelente servicio, vehículos en perfecto estado y precios justos. Totalmente recomendado.", rating: 5 },
              { name: "Carlos Pérez", text: "La mejor experiencia de alquiler que he tenido. Personal muy profesional y amable.", rating: 5 },
              { name: "Ana Martínez", text: "Proceso rápido y sencillo. El vehículo estaba impecable. Volveré sin duda.", rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white" id="contacto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para reservar tu vehículo?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contáctanos hoy y obtén las mejores ofertas en alquiler de vehículos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">📞</span>
              <span>(809) 555-1234</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">📧</span>
              <span>info@rentcar.com</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-2xl">📍</span>
              <span>Santo Domingo, RD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🚗 RentCar</h3>
              <p className="text-gray-400">La mejor opción para alquilar vehículos en República Dominicana</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#vehiculos" className="hover:text-white transition">Vehículos</a></li>
                <li><a href="#servicios" className="hover:text-white transition">Servicios</a></li>
                <li><a href="#testimonios" className="hover:text-white transition">Testimonios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (809) 555-1234</li>
                <li>📧 info@rentcar.com</li>
                <li>📍 Santo Domingo, RD</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RentCar. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
