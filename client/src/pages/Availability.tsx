import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";

const DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export default function Availability() {
const [, navigate] = useLocation();
  const utils = trpc.useUtils();

const { data: availability = [] } =
  trpc.availability.list.useQuery();

const upsert = trpc.availability.upsert.useMutation({
  onSuccess: () => {
    utils.availability.list.invalidate();
  },
});

  const [formData, setFormData] = useState({
    dayOfWeek: 0,
    startTime: "09:00",
    endTime: "18:00",
    isAvailable: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await upsert.mutateAsync(formData);

  alert("Disponibilidade salva com sucesso!");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-4xl mx-auto">
<button
  type="button"
  onClick={() => navigate("/")}
  className="mb-4 px-4 py-2 bg-white border border-amber-200 rounded-lg text-amber-800 hover:bg-amber-50 transition"
>
  ← Voltar ao Início
</button>
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Disponibilidade</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm border border-amber-100 mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Configurar Horários</h2>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Dia da Semana</label>
            <select
              value={formData.dayOfWeek}
              onChange={e => setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
            >
              {DAYS.map((day, idx) => (
                <option key={idx} value={idx}>{day}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Início</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Fim</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="ml-2 text-amber-900 font-semibold">Disponível neste dia</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-2 rounded-lg hover:bg-amber-700"
          >
            Salvar Disponibilidade
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DAYS.map((day, idx) => {
            const dayAvail = availability.find(a => a.dayOfWeek === idx);
            return (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-2">{day}</h3>
                {dayAvail ? (
                  <p className="text-amber-600">
                    {dayAvail.isAvailable ? `${dayAvail.startTime} - ${dayAvail.endTime}` : "Indisponível"}
                  </p>
                ) : (
                  <p className="text-amber-400 text-sm">Não configurado</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
