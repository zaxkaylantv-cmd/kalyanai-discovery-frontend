import { BrowserRouter, Routes, Route } from "react-router-dom";

import Discovery from "./pages/Discovery";
import Register from "./pages/Register";
import SignIn from "./pages/Signin";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
