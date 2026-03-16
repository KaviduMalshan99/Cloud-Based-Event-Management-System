import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/events" element={<Events/>} />

        <Route path="/create-event" element={<CreateEvent/>} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;