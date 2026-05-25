import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-900">
            AgendaFácil
          </h1>

          <nav className="flex gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-amber-700 hover:text-amber-900"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="text-amber-700 hover:text-amber-900"
            >
              Perfil
            </button>

            <button
              onClick={() => navigate("/services")}
              className="text-amber-700 hover:text-amber-900"
            >
              Serviços
            </button>

            <button
              onClick={() => navigate("/availability")}
              className="text-amber-700 hover:text-amber-900"
            >
              Disponibilidade
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            AgendaFácil
          </h1>

          <p className="text-xl text-amber-700 mb-8">
            Agendamento simples e elegante para profissionais autônomos
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/profile")}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Criar Perfil
            </button>

            <button
              onClick={() => navigate("/services")}
              className="px-8 py-3 bg-white border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition"
            >
              Gerenciar Serviços
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-white border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition"
            >
              Ver Dashboard
            </button>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-sm border border-amber-100 p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              Funcionalidades
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-4 border border-amber-100 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-2">
                  Perfil Profissional
                </h3>
                <p className="text-amber-600 text-sm">
                  Crie sua página pública de agendamento.
                </p>
              </div>

              <div className="p-4 border border-amber-100 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-2">
                  Serviços
                </h3>
                <p className="text-amber-600 text-sm">
                  Cadastre serviços com preço e duração.
                </p>
              </div>

              <div className="p-4 border border-amber-100 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-2">
                  Disponibilidade
                </h3>
                <p className="text-amber-600 text-sm">
                  Configure dias e horários de atendimento.
                </p>
              </div>

              <div className="p-4 border border-amber-100 rounded-lg">
                <h3 className="font-bold text-amber-800 mb-2">
                  Dashboard
                </h3>
                <p className="text-amber-600 text-sm">
                  Gerencie seus agendamentos em tempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}