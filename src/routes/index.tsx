import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import LandingPage from '../pages/LandingPage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import MainLayout from '../components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}