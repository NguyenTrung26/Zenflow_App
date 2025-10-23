// src/screens/PremiumScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, CheckCircle } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function PremiumScreen() {
  const navigate = useNavigate();
  const { setIsPremium } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pb-24">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 text-gray-600 hover:text-gray-800 font-semibold"
        >
          ← Quay lại
        </button>

        <div className="text-center mb-8">
          <Crown className="text-yellow-500 mx-auto mb-4" size={64} />
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            ZenFlow Premium
          </h2>
          <p className="text-gray-600 text-lg">
            Mở khóa toàn bộ trải nghiệm thiền và yoga
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              icon: "🎥",
              title: "Video HD không giới hạn",
              desc: "Truy cập hơn 200+ bài tập yoga chuyên sâu",
            },
            {
              icon: "🎵",
              title: "Thư viện âm nhạc cao cấp",
              desc: "Hơn 50 track nhạc thiền độc quyền",
            },
            {
              icon: "🤖",
              title: "AI cá nhân hóa",
              desc: "Lộ trình tập luyện được tùy chỉnh riêng cho bạn",
            },
            {
              icon: "📊",
              title: "Thống kê chi tiết",
              desc: "Theo dõi tiến trình với biểu đồ và insights",
            },
            {
              icon: "💾",
              title: "Lưu trữ không giới hạn",
              desc: "Đồng bộ dữ liệu trên mọi thiết bị",
            },
            {
              icon: "🎁",
              title: "Nội dung độc quyền",
              desc: "Workshops và khóa học từ chuyên gia",
            },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Hàng tháng
            </h3>
            <p className="text-4xl font-bold text-teal-600 mb-4">
              199.000₫<span className="text-lg text-gray-600">/tháng</span>
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="text-teal-500" size={20} />
                Tất cả tính năng Premium
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="text-teal-500" size={20} />
                Hủy bất cứ lúc nào
              </li>
            </ul>
            <button
              onClick={() => setIsPremium(true)}
              className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold hover:bg-teal-600 transition-all"
            >
              Đăng ký ngay
            </button>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-xl border-4 border-yellow-300 relative">
            <div className="absolute -top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              Tiết kiệm 30%
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Hàng năm</h3>
            <p className="text-4xl font-bold text-white mb-1">
              1.680.000₫<span className="text-lg">/năm</span>
            </p>
            <p className="text-white/90 text-sm mb-4">Chỉ 140.000₫/tháng</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-white">
                <CheckCircle size={20} />
                Tất cả tính năng Premium
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle size={20} />
                Tặng 2 tháng miễn phí
              </li>
              <li className="flex items-center gap-2 text-white">
                <CheckCircle size={20} />
                Ưu tiên hỗ trợ 24/7
              </li>
            </ul>
            <button
              onClick={() => setIsPremium(true)}
              className="w-full bg-white text-orange-600 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all"
            >
              Mua gói năm
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm">
          7 ngày dùng thử miễn phí • Hủy bất cứ lúc nào • Thanh toán an toàn
        </p>
      </div>
    </div>
  );
}
