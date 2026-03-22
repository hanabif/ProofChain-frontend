import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import MainLayout from '../components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}