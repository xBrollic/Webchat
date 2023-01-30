import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="login" element={<Login />} />
      <Route exact path="signup" element={<Signup />} />
      <Route exact path="chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
