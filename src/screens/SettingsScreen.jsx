// src/screens/SettingsScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Moon, Volume2 } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { notifications, setNotifications } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-teal-600 hover:text-teal-800 font-semibold"
        >
          ← Quay lại
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">Cài đặt</h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <h3 className="font-bold text-gray-800 p-6 border-b">Ứng dụng</h3>
          <div className="divide-y">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Bell className="text-teal-600" size={24} />
                <div>
                  <p className="font-semibold text-gray-800">
                    Nhắc nhở luyện tập
                  </p>
                  <p className="text-sm text-gray-600">
                    07:00 và 20:00 hàng ngày
                  </p>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-teal-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Moon className="text-teal-600" size={24} />
                <div>
                  <p className="font-semibold text-gray-800">
                    Chế độ tối tự động
                  </p>
                  <p className="text-sm text-gray-600">
                    Bật tự động vào ban đêm
                  </p>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-teal-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Volume2 className="text-teal-600" size={24} />
                <div>
                  <p className="font-semibold text-gray-800">Âm lượng</p>
                  <p className="text-sm text-gray-600">
                    Điều chỉnh âm thanh nền
                  </p>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="w-32"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <h3 className="font-bold text-gray-800 p-6 border-b">
            Ngôn ngữ & Khu vực
          </h3>
          <div className="divide-y">
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <div>
                <p className="font-semibold text-gray-800">Ngôn ngữ</p>
                <p className="text-sm text-gray-600">Tiếng Việt</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <div>
                <p className="font-semibold text-gray-800">Múi giờ</p>
                <p className="text-sm text-gray-600">GMT+7 (Hà Nội)</p>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <h3 className="font-bold text-gray-800 p-6 border-b">
            Dữ liệu & Quyền riêng tư
          </h3>
          <div className="divide-y">
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <div>
                <p className="font-semibold text-gray-800">Đồng bộ dữ liệu</p>
                <p className="text-sm text-gray-600">Sao lưu trên cloud</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-teal-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
              </label>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-800">Xuất dữ liệu</p>
              <span className="text-gray-400">›</span>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-800">Xóa tài khoản</p>
              <span className="text-red-500">›</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <h3 className="font-bold text-gray-800 p-6 border-b">Về ZenFlow</h3>
          <div className="divide-y">
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-800">Phiên bản</p>
              <p className="text-gray-600">1.0.0</p>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-800">Điều khoản dịch vụ</p>
              <span className="text-gray-400">›</span>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-800">Chính sách bảo mật</p>
              <span className="text-gray-400">›</span>
            </div>
            <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold text-gray-800">Liên hệ hỗ trợ</p>
              <span className="text-gray-400">›</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition-all">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
