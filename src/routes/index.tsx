import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from '../pages/LandingPage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Explore from '../pages/Explore';
import FileDetail from '../pages/FileDetail';
import CreatLicense from '../pages/CreatLicense';
import AttachFile from '../pages/AttachFile';
import DashboardOverview from '../pages/dashboard/DashboardOverview';
import VerifyDocument from '../pages/dashboard/VerifyDocument';
import MyAssets from '../pages/dashboard/MyAssets';
import AssetDetail from '../pages/dashboard/AssetDetail';
import Licenses from '../pages/dashboard/Licenses';
import LicenseAssets from '../pages/dashboard/LicenseAssets';
import RequestLicense from '../pages/dashboard/RequestLicense';
import EditLicense from '../pages/dashboard/EditLicense';




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
          <Route path="/dashboard/overview" element={<DashboardOverview />} />
          <Route path="/dashboard/verify" element={<VerifyDocument />} />
          <Route path="/dashboard/assets" element={<MyAssets />} />
          <Route path="/dashboard/asset/:id" element={<AssetDetail />} />
          <Route path="/dashboard/licenses" element={<Licenses />} />
          <Route path="/dashboard/license/:id/assets" element={<LicenseAssets />} />
          <Route path="/dashboard/license/:id/requests" element={<RequestLicense />} />
          <Route path="/dashboard/license/:id/edit" element={<EditLicense />} />




        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}