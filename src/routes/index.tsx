import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from '../pages/LandingPage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import GoogleCallback from '../pages/GoogleCallback';
import Explore from '../pages/Explore';
import FileDetail from '../pages/FileDetail';
import CreatLicense from '../pages/CreatLicense';
import AttachFile from '../pages/AttachFile';
import DashboardOverview from '../pages/dashboard/DashboardOverview';
import VerifyDocument from '../pages/dashboard/VerifyDocument';
import MyAssets from '../pages/dashboard/MyAssets';
import Licenses from '../pages/dashboard/Licenses';
import Requests from '../pages/dashboard/Requests';
import Transactions from '../pages/dashboard/Transactions';
import LicenseAssets from '../pages/dashboard/LicenseAssets';
import RequestLicense from '../pages/dashboard/RequestLicense';
import EditLicense from '../pages/dashboard/EditLicense';
import CreateLicenseDashboard from '../pages/dashboard/CreateLicenseDashboard';
import MainLayout from '../components/layout/MainLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/file/:id" element={<FileDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
          
          <Route path="/dashboard/overview" element={
            <ProtectedRoute>
              <DashboardOverview />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/verify" element={
            <ProtectedRoute>
              <VerifyDocument />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/assets" element={
            <ProtectedRoute>
              <MyAssets />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/asset/:id" element={
            <ProtectedRoute>
              <FileDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/licenses" element={
            <ProtectedRoute>
              <Licenses />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/requests" element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/license/:id/assets" element={
            <ProtectedRoute>
              <LicenseAssets />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/license/:id/requests" element={
            <ProtectedRoute>
              <RequestLicense />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/license/:id/edit" element={
            <ProtectedRoute>
              <EditLicense />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/create-license" element={
            <ProtectedRoute>
              <CreateLicenseDashboard />
            </ProtectedRoute>
          } />

          {/* Legacy/Misc Routes (Decide if these should be protected) */}
          <Route path="/create-license" element={<CreatLicense />} />
          <Route path="/attach-file" element={<AttachFile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}