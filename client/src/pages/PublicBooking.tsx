import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useRoute, useLocation } from "wouter";

export default function PublicBooking() {
  const [, params] = useRoute("/book/:slug");
  const [, navigate] = useLocation();

  const slug = params?.slug as string;

  const { data: professional } = trpc.public.getProfessional.useQuery(
    { slug },
    { enabled: !!slug }
  );

  const { data: services = [] } = trpc.public.getServices.useQuery(
    { professionalId: professional?.id || 0 },
    { enabled: !!professional }
  );

  const { data: availability = [] } = trpc.public.getAvailability.useQuery(
    { professionalId: professional?.id || 0 },
    { enabled: !!professional }
  );

  const createBooking = trpc.public.createBooking.useMutation();

  const [formData, setFormData] = useState({
    serviceId: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    startTime: "",
  });

  const selectedDate = formData.startTime
    ? new Date(formData.startTime)
    : null;

  const selectedAvailability = selectedDate
    ? availability.find((a) => a.dayOfWeek === selectedDate.getDay())
    : null;

  const isDateAvailable = () => {
    if (!selectedDate || !selectedAvailability) return false;

    if (!selectedAvailability.isAvailable) return false;

    const selectedTime = selectedDate.toTimeString().slice(0, 5);

    return (
      selectedTime >= selectedAvailability.startTime &&
      selectedTime <= selectedAvailability.endTime
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!professional) return;

    const service = services.find((s) => s.id === formData.serviceId);

    if (!service) {
      alert("Selecione um serviço");
      return;
    }

    if (!isDateAvailable()) {
      alert("Esse dia ou horário não está disponível para agendamento.");
      return;
    }

    const startDate = new Date(formData.startTime);
    const endTime = new Date(startDate);

    endTime.setMinutes(endTime.getMinutes() + service.durationMinutes);

    try {
      await createBooking.mutateAsync({
        professionalId: professional.id,
        serviceId: formData.serviceId,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        startTime: startDate,
        endTime,
      });

      navigate("/confirmacao");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar agendamento");
    }
  };

  if (!professional) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <p className="text-amber-700 text-xl">
          Carregando profissional...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-amber-100 p-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">
          {professional.businessName}
        </h1>

        <p className="text-amber-700 mb-8">
          {professional.description}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-amber-900 font-semibold mb-2">
              Serviço
            </label>

            <select
              value={formData.serviceId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceId: Number(e.target.value),
                })
              }
              className="w-full border border-amber-200 rounded-lg px-4 py-3"
              required
            >
              <option value={0}>Selecione um serviço</option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-amber-900 font-semibold mb-2">
              Nome
            </label>

            <input
              type="text"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientName: e.target.value,
                })
              }
              className="w-full border border-amber-200 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-amber-900 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientEmail: e.target.value,
                })
              }
              className="w-full border border-amber-200 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-amber-900 font-semibold mb-2">
              Telefone
            </label>

            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientPhone: e.target.value,
                })
              }
              className="w-full border border-amber-200 rounded-lg px-4 py-3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-amber-900 font-semibold mb-2">
              Data e Hora
            </label>

            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startTime: e.target.value,
                })
              }
              className="w-full border border-amber-200 rounded-lg px-4 py-3"
              required
            />
          </div>

          {selectedDate && selectedAvailability && (
            <p className="text-sm text-amber-700 mb-5">
              Horário disponível nesse dia: {selectedAvailability.startTime} até{" "}
              {selectedAvailability.endTime}
            </p>
          )}

          {selectedDate && !selectedAvailability && (
            <p className="text-sm text-red-600 mb-5">
              Esse dia não possui disponibilidade configurada.
            </p>
          )}

          {selectedDate &&
            selectedAvailability &&
            !isDateAvailable() && (
              <p className="text-sm text-red-600 mb-5">
                O horário escolhido está fora da disponibilidade configurada.
              </p>
            )}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 transition text-white font-semibold py-3 rounded-lg"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}