import { Route, Switch } from "wouter";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Availability from "./pages/Availability";
import PublicBooking from "./pages/PublicBooking";
import BookingConfirmation from "./pages/BookingConfirmation";

function App() {
  return (
    <Switch>
      {/* Home */}
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />

      {/* Área profissional */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/services" component={Services} />
      <Route path="/availability" component={Availability} />

      {/* Área pública do cliente */}
      <Route path="/book/:slug" component={PublicBooking} />
      <Route path="/confirmacao" component={BookingConfirmation} />

      {/* 404 */}
      <Route
        component={() => (
          <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
            404 - Página não encontrada
          </div>
        )}
      />
    </Switch>
  );
}

export default App;