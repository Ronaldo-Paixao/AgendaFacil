import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Services() {
const [, navigate] = useLocation();
  const { data: services = [] } = trpc.services.list.useQuery();
  const createService = trpc.services.create.useMutation();
  const deleteService = trpc.services.delete.useMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    durationMinutes: 60,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createService.mutateAsync(formData);
    setFormData({ name: "", description: "", price: 0, durationMinutes: 60 });
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

  <h1 className="text-4xl font-bold text-amber-900 mb-8">
    Meus Serviços
  </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm border border-amber-100 mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Novo Serviço</h2>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Nome do Serviço</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Preço (R$)</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">Duração (minutos)</label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={e => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-2 rounded-lg hover:bg-amber-700"
          >
            Adicionar Serviço
          </button>
        </form>

        <div className="space-y-4">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-amber-900">{service.name}</h3>
                  <p className="text-amber-600 text-sm mt-1">{service.description}</p>
                  <div className="mt-3 flex gap-4 text-sm">
                    <span className="text-amber-700 font-semibold">R$ {service.price}</span>
                    <span className="text-amber-600">{service.durationMinutes} min</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteService.mutateAsync({ id: service.id })}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
