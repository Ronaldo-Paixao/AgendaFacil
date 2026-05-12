import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { data: bookings = [] } = trpc.bookings.list.useQuery();

  const todayBookings = bookings.filter(b => {
    const today = new Date();
    const bookingDate = new Date(b.startTime);
    return bookingDate.toDateString() === today.toDateString();
  });

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const confirmedBookings = bookings.filter(b => b.status === "confirmed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
            <h3 className="text-amber-600 text-sm font-semibold mb-2">Agendamentos Hoje</h3>
            <p className="text-3xl font-bold text-amber-900">{todayBookings.length}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-100">
            <h3 className="text-orange-600 text-sm font-semibold mb-2">Pendentes</h3>
            <p className="text-3xl font-bold text-orange-900">{pendingBookings.length}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-yellow-100">
            <h3 className="text-yellow-600 text-sm font-semibold mb-2">Confirmados</h3>
            <p className="text-3xl font-bold text-yellow-900">{confirmedBookings.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Próximos Agendamentos</h2>
          {todayBookings.length === 0 ? (
            <p className="text-amber-600">Nenhum agendamento para hoje</p>
          ) : (
            <div className="space-y-4">
              {todayBookings.map(booking => (
                <div key={booking.id} className="border-l-4 border-amber-500 pl-4 py-2">
                  <p className="font-semibold text-amber-900">{booking.clientName}</p>
                  <p className="text-sm text-amber-600">
                    {new Date(booking.startTime).toLocaleTimeString()}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
