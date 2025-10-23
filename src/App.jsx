// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import BottomNav from "./components/BottomNav";

// 🧩 Lazy load các màn hình (tăng tốc độ load ban đầu)
const OnboardingScreen = lazy(() => import("./screens/OnboardingScreen"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const MeditationScreen = lazy(() => import("./screens/MeditationScreen"));
const YogaScreen = lazy(() => import("./screens/YogaScreen"));
const PremiumScreen = lazy(() => import("./screens/PremiumScreen"));
const ScheduleScreen = lazy(() => import("./screens/ScheduleScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const SettingsScreen = lazy(() => import("./screens/SettingsScreen"));
const MusicScreen = lazy(() => import("./screens/MusicScreen"));
const BreathworkScreen = lazy(() => import("./screens/BreathworkScreen"));
const DashboardScreen = lazy(() => import("./screens/DashboardScreen"));

// 🧭 Layout riêng để điều khiển hiển thị BottomNav
function Layout() {
  const location = useLocation();
  const hideBottomNavRoutes = ["/", "/premium"];
  const showBottomNav = !hideBottomNavRoutes.includes(location.pathname);

  return (
    <div className="font-sans antialiased min-h-screen">
      <Suspense
        fallback={<div className="text-center p-10">⏳ Đang tải...</div>}
      >
        <Routes>
          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/meditation" element={<MeditationScreen />} />
          <Route path="/yoga" element={<YogaScreen />} />
          <Route path="/premium" element={<PremiumScreen />} />
          <Route path="/schedule" element={<ScheduleScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/music" element={<MusicScreen />} />
          <Route path="/breath" element={<BreathworkScreen />} />
        </Routes>
      </Suspense>

      {/* 🔻 Hiện thanh điều hướng trừ khi ở trang Onboarding/Premium */}
      {showBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppProvider>
  );
}
