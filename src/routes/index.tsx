import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Register from '../pages/Register';
import MainLayout from '../components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}