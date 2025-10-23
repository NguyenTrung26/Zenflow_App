// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import BottomNav from "./components/BottomNav";

import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import MeditationScreen from "./screens/MeditationScreen";
import YogaScreen from "./screens/YogaScreen";
import PremiumScreen from "./screens/PremiumScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MusicScreen from "./screens/MusicScreen";
import BreathworkScreen from "./screens/BreathworkScreen";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="font-sans antialiased min-h-screen">
          <Routes>
            <Route path="/" element={<OnboardingScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/meditation" element={<MeditationScreen />} />
            <Route path="/yoga" element={<YogaScreen />} />
            <Route path="/premium" element={<PremiumScreen />} />
            <Route path="/schedule" element={<ScheduleScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/music" element={<MusicScreen />} />
            <Route path="/breath" element={<BreathworkScreen />} />
          </Routes>

          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
