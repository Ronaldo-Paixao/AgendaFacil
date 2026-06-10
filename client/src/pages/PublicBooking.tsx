import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

console.log("slug:", slug);
console.log("professional:", professional);

  const { data: services = [] } = trpc.public.getServices.useQuery(
    { professionalId: professional?.id || 0 },
    { enabled: !!professional }
  );

  const { data: availability = [] } = trpc.public.getAvailability.useQuery(
  { professionalId: professional?.id || 0 },
  {
    enabled: !!professional,
    refetchInterval: 5000,
  }
);

const { data: existingBookings = [] } =
  trpc.public.getBookings.useQuery(
    {
      professionalId: professional?.id || 0,
    },
    {
      enabled: !!professional,
      refetchInterval: 5000,
    }
  );


  const createBooking = trpc.public.createBooking.useMutation();

  const [formData, setFormData] = useState({
    serviceId: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    startTime: "",
  });

const [selectedDay, setSelectedDay] = useState<Date | null>(null);

const isDayAvailable = (date: Date) => {
  const dayOfWeek = date.getDay();

  return availability.some(
    (a) => a.dayOfWeek === dayOfWeek && a.isAvailable
  );
};

const getAvailableTimes = () => {
  if (!selectedDay) return [];

  const dayAvailability = availability.find(
    (a) => a.dayOfWeek === selectedDay.getDay()
  );

  if (!dayAvailability) return [];

  const bookedTimes = existingBookings
    .filter((booking) => {
      const bookingDate = new Date(booking.startTime);

      return (
        bookingDate.toDateString() ===
        selectedDay.toDateString()
      );
    })
    .map((booking) => {
      const bookingDate = new Date(booking.startTime);

      return bookingDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    });

  const times = [];

  const startHour = parseInt(
    dayAvailability.startTime.split(":")[0]
  );

  const endHour = parseInt(
    dayAvailability.endTime.split(":")[0]
  );

  const now = new Date();

for (let hour = startHour; hour < endHour; hour++) {
  const time = `${hour.toString().padStart(2, "0")}:00`;

  const slotDate = new Date(selectedDay);

  slotDate.setHours(hour);
  slotDate.setMinutes(0);
  slotDate.setSeconds(0);

  const isPast = slotDate < now;

  if (!bookedTimes.includes(time) && !isPast) {
    times.push(time);
  }
}
return times;
};

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

          <div className="mb-5">
  <label className="block text-amber-900 font-semibold mb-2">
    Escolha uma Data
  </label>

  <Calendar
    onChange={(value: any) => {
      const date = value as Date;

      setSelectedDay(date);

      setFormData({
        ...formData,
        startTime: date.toISOString(),
      });
    }}
    value={selectedDay || new Date()}
    tileDisabled={({ date }) => !isDayAvailable(date)}
minDate={new Date()}
  />
</div>

{selectedDay && (
  <div className="mt-6">
    <label className="block text-amber-900 font-semibold mb-3">
      Horários Disponíveis
    </label>

    <div className="grid grid-cols-3 gap-2">
      {getAvailableTimes().map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => {
            const [hours, minutes] = time.split(":");

            const newDate = new Date(selectedDay);

            newDate.setHours(Number(hours));
            newDate.setMinutes(Number(minutes));

            setFormData({
              ...formData,
              startTime: newDate.toISOString(),
            });
          }}
          className="bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg py-2 font-medium"
        >
          {time}
        </button>
      ))}
    </div>
  </div>
)}

{formData.startTime && (
  <p className="mt-3 text-green-600 font-medium">
    Horário selecionado:{" "}
    {new Date(formData.startTime).toLocaleString("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
})}
  </p>
)}
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