import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";


export default function Dashboard() {
const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const { data: bookings = [] } =
  trpc.bookings.list.useQuery(
    undefined,
    {
      refetchInterval: 5000,
    }
  );

  const updateBookingStatus = trpc.bookings.confirm.useMutation({
    onSuccess: () => {
      utils.bookings.list.invalidate();
    },
  });

const deleteBooking = trpc.bookings.delete.useMutation({
  onSuccess: () => {
    utils.bookings.list.invalidate();
  },
});

  const today = new Date();

  const todayBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.startTime);
    return bookingDate.toDateString() === today.toDateString();
  });

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

const totalBookings = bookings.length;

const confirmationRate =
  totalBookings > 0
    ? Math.round((confirmedBookings.length / totalBookings) * 100)
    : 0;

  const todayBookingsList = bookings
    .filter((b) => {
      const bookingDate = new Date(b.startTime);
      return bookingDate.toDateString() === today.toDateString();
    })
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  const pendingOtherDays = bookings
    .filter((b) => {
      const bookingDate = new Date(b.startTime);

      return (
        bookingDate.toDateString() !== today.toDateString() &&
        b.status === "pending"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  const otherBookings = bookings
    .filter((b) => {
      const bookingDate = new Date(b.startTime);

      return (
        bookingDate.toDateString() !== today.toDateString() &&
        b.status !== "pending"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  const queueBookings = [
    ...todayBookingsList,
    ...pendingOtherDays,
    ...otherBookings,
  ];

  const getStatusLabel = (status: string) => {
    if (status === "pending") return "Pendente";
    if (status === "confirmed") return "Confirmado";
    return status;
  };

  const getStatusClass = (status: string) => {
    if (status === "confirmed") {
      return "bg-green-100 text-green-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
    <div className="max-w-6xl mx-auto">

      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-white border border-amber-200 rounded-lg text-amber-800 hover:bg-amber-50 transition"
      >
        ← Voltar ao Início
      </button>

<Breadcrumb current="Dashboard" />

      <h1 className="text-4xl font-bold text-amber-900 mb-8">
        Dashboard
      </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
            <h3 className="text-amber-600 text-sm font-semibold mb-2">
              Agendamentos Hoje
            </h3>

            <p className="text-3xl font-bold text-amber-900">
              {todayBookings.length}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
            <h3 className="text-orange-600 text-sm font-semibold mb-2">
              Pendentes
            </h3>

            <p className="text-3xl font-bold text-orange-900">
              {pendingBookings.length}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
            <h3 className="text-green-600 text-sm font-semibold mb-2">
              Confirmados
            </h3>

            <p className="text-3xl font-bold text-green-900">
              {confirmedBookings.length}
            </p>
          </div>
        </div>

<div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
  <h3 className="text-blue-600 text-sm font-semibold mb-2">
    Total de Agendamentos
  </h3>

  <p className="text-3xl font-bold text-blue-900">
    {totalBookings}
  </p>
</div>

<div className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
  <h3 className="text-purple-600 text-sm font-semibold mb-2">
    Taxa de Confirmação
  </h3>

  <p className="text-3xl font-bold text-purple-900">
    {confirmationRate}%
  </p>
</div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Fila de Próximos Agendamentos
          </h2>

          {queueBookings.length === 0 ? (
            <p className="text-amber-600">
              Nenhum agendamento encontrado
            </p>
          ) : (
            <div className="space-y-4">
              {queueBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className="border-l-4 border-amber-500 pl-4 py-3 bg-amber-50 rounded-r-lg"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-bold text-amber-900">
                        #{index + 1} - {booking.clientName}
                      </p>

                      <p className="text-sm text-amber-700">
                        {new Date(booking.startTime).toLocaleDateString()} às{" "}
                        {new Date(booking.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="text-sm text-amber-600">
                        Telefone: {booking.clientPhone}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {getStatusLabel(booking.status)}
                      </span>

                      {booking.status === "pending" ? (
                        <button
                          onClick={() =>
                            updateBookingStatus.mutateAsync({
                              id: booking.id,
                              status: "confirmed",
                            })
                          }
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                        >
                          Confirmar
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateBookingStatus.mutateAsync({
                              id: booking.id,
                              status: "pending",
                            })
                          }
                          className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition"
                        >
                          Desfazer
                        </button>
                      )}

<button
  onClick={() => {
    const confirmed = window.confirm(
      "Deseja realmente excluir este agendamento?"
    );

    if (!confirmed) return;

    deleteBooking.mutate({
      id: booking.id,
    });
  }}
  className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
>
  Excluir
</button>
                    </div>
                  </div>
                </div>
               ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

    </div>
  );
}