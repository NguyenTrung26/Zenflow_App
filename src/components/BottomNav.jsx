// src/components/BottomNav.jsx
import React from "react";
import { Home, Heart, Calendar, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { zenMode } = useApp();

  const tabs = [
    { icon: Home, label: "Trang chủ", path: "/home" },
    { icon: Heart, label: "Thiền", path: "/meditation" },
    { icon: Calendar, label: "Lịch", path: "/schedule" },
    { icon: User, label: "Cá nhân", path: "/profile" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        zenMode ? "bg-gray-800" : "bg-white"
      } border-t shadow-2xl transition-colors`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-around">
        {tabs.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
              location.pathname === item.path
                ? zenMode
                  ? "text-teal-400 bg-gray-700"
                  : "text-teal-600 bg-teal-50"
                : zenMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
