import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Availability from "./pages/Availability";
import PublicBooking from "./pages/PublicBooking";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/services" component={Services} />
      <Route path="/availability" component={Availability} />
      <Route path="/book/:slug" component={PublicBooking} />
      <Route component={() => <div className="min-h-screen flex items-center justify-center">404 - Página não encontrada</div>} />
    </Switch>
  );
}

export default App;
