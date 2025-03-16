import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import AccessControlPage from "./pages/AccessControlPage";
import Complaints from "./pages/Complaints";
import Dashboard from "./pages/Dashboard";
import HomePageLogin from "./pages/HomePageLogin";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import SettingsPage from "./pages/SettingsPage";
import ApartmentDetails from "./pages/details/ApartmentDetails";
import ComplaintDetails from "./pages/details/ComplaintDetails";
import LeaseDetails from "./pages/details/LeaseDetails";
import TenantDetails from "./pages/details/TenantDetails";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePageLogin />} />
        <Route path="register" element={<Register />} />

        <Route element={<RootLayout />}>
          <Route path="*" element={<NotFoundPage />}></Route>

          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="complaints" element={<Complaints />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="access-control" element={<AccessControlPage />}></Route>
          <Route path="settings" element={<SettingsPage />}></Route>

          <Route
            path="apartment-details/:id"
            element={<ApartmentDetails />}
          ></Route>
          <Route path="lease-details/:id" element={<LeaseDetails />}></Route>
          <Route path="tenant-details/:id" element={<TenantDetails />}></Route>
          <Route
            path="complaint-details/:id"
            element={<ComplaintDetails />}
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
