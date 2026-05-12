import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-900">AgendaFácil</h1>
          <nav className="flex gap-4">
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate("/dashboard")} className="text-amber-700 hover:text-amber-900">
                  Dashboard
                </button>
                <button onClick={() => navigate("/profile")} className="text-amber-700 hover:text-amber-900">
                  Perfil
                </button>
                <button onClick={() => navigate("/services")} className="text-amber-700 hover:text-amber-900">
                  Serviços
                </button>
                <button onClick={() => navigate("/availability")} className="text-amber-700 hover:text-amber-900">
                  Disponibilidade
                </button>
              </>
            ) : null}
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
          {!isAuthenticated ? (
            <button className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              Começar Agora
            </button>
          ) : (
            <button onClick={() => navigate("/dashboard")} className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              Ir para Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
