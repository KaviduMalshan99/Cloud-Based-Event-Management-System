import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";

/* Admin Pages */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminBookings from "./pages/admin/AdminBookings";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/register" element={<Register />} />

        <Route path="/events" element={<Events/>} />

        {/* Admin Panel */}

        <Route path="/admin" element={<AdminLayout/>}>

          <Route index element={<AdminDashboard/>} />

          <Route path="users" element={<AdminUsers/>} />

          <Route path="events" element={<AdminEvents/>} />

          <Route path="bookings" element={<AdminBookings/>} />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;