import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="feedbacks/login" element={<Login />} />
        <Route path="feedbacks/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
