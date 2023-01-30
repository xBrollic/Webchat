import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/*public*/}
        <Route exact path='login' element={<Login />} />
        <Route exact path='signup' element={<Signup />} />

        {/*private*/}
        <Route element={<RequireAuth />}>
          <Route path='chat' element={<Chat />} />
        </Route>

        {/*allt annat*/}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
