import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useRoute } from "wouter";

export default function PublicBooking() {
  const [, params] = useRoute("/book/:slug");
  const slug = params?.slug as string;

  const { data: professional } = trpc.public.getProfessional.useQuery(
    { slug },
    { enabled: !!slug }
  );

  const { data: services = [] } = trpc.public.getServices.useQuery(
    { professionalId: professional?.id || 0 },
    { enabled: !!professional }
  );

  const createBooking = trpc.public.createBooking.useMutation();

  const [formData, setFormData] = useState({
    serviceId: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    startTime: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!professional) return;

    const service = services.find(s => s.id === formData.serviceId);
    if (!service) return;

    const endTime = new Date(formData.startTime);
    endTime.setMinutes(endTime.getMinutes() + service.durationMinutes);

    await createBooking.mutateAsync({
      professionalId: professional.id,
      serviceId: formData.serviceId,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      startTime: formData.startTime,
      endTime,
    });
  };

  if (!professional) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <p className="text-amber-600">Profissional não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">{professional.businessName}</h1>
        <p className="text-amber-600 mb-8">{professional.description}</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Agendar Serviço</h2>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Serviço</label>
            <select
              value={formData.serviceId}
              onChange={e => setFormData({ ...formData, serviceId: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              required
            >
              <option value={0}>Selecione um serviço</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Nome</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={e => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={e => setFormData({ ...formData, clientEmail: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-amber-900 font-semibold mb-2">Telefone</label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={e => setFormData({ ...formData, clientPhone: e.target.value })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-amber-900 font-semibold mb-2">Data e Hora</label>
            <input
              type="datetime-local"
              value={formData.startTime.toISOString().slice(0, 16)}
              onChange={e => setFormData({ ...formData, startTime: new Date(e.target.value) })}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}
