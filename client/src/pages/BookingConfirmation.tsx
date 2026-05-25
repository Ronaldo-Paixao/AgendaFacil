import { useLocation } from "wouter";

export default function BookingConfirmation() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-sm border border-amber-100 p-10 max-w-lg text-center">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          Agendamento Confirmado!
        </h1>

        <p className="text-amber-700 mb-8">
          Seu agendamento foi realizado com sucesso. Em breve o profissional poderá confirmar o horário.
        </p>

        <button
          onClick={() => navigate("/home")}
          className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
}