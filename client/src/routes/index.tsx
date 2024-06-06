import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import DeProtectRoute from "./DeProtectRoute";
import Expenses from "../pages/Expenses";
import Sources from "../pages/Sources";

const MyRouter = () => {
  return (
    <Routes>
      <Route element={<DeProtectRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route path="/" element={<Home />} />

      <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/sources" element={<Sources />} />
        {/* <Route path="/about" element={About} /> */}
      </Route>
    </Routes>
  );
}

export default MyRouter;