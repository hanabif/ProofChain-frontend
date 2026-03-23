import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import FileDetail from '../pages/FileDetail';
import CreatLicense from '../pages/CreatLicense';
import AttachFile from '../pages/AttachFile';
import MainLayout from '../components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/file/:id" element={<FileDetail />} />
          <Route path="/create-license" element={<CreatLicense />} />
          <Route path="/attach-file" element={<AttachFile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}