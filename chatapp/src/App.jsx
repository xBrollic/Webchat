import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import PercistLogin from "./components/PersistLogin";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/*public*/}
        <Route exact path='login' element={<Login />} />
        <Route exact path='signup' element={<Signup />} />
        <Route exact path='/' element={<Home />} />

        {/*private*/}
        <Route element={<PercistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path='/chat' element={<Chat />} />
          </Route>
        </Route>
        {/*allt annat*/}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
