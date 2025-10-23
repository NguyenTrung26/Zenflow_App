import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, CheckCircle, Loader2 } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { db } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { save } from "../utils/storage";

export default function PremiumScreen() {
  const navigate = useNavigate();
  const { user, isPremium, setIsPremium } = useApp();
  const [loading, setLoading] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  // 🧭 Kiểm tra trạng thái premium khi load trang
  useEffect(() => {
    const checkStatus = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().isPremium) {
          setIsPremium(true);
          setUpgraded(true);
          save("isPremium", true);
        }
      } catch (err) {
        console.error("⚠️ Lỗi kiểm tra Premium:", err);
      }
    };
    checkStatus();
  }, [user]);

  // 💎 Nâng cấp Premium
  const handleUpgrade = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập trước khi nâng cấp Premium.");
      navigate("/profile");
      return;
    }

    try {
      setLoading(true);

      // Ghi lên Firestore
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, { isPremium: true }, { merge: true });

      // Cập nhật context + localStorage
      setIsPremium(true);
      setUpgraded(true);
      save("isPremium", true);

      // Thông báo
      alert("🎉 Chúc mừng! Bạn đã trở thành thành viên Premium!");
    } catch (error) {
      console.error("🔥 Lỗi khi nâng cấp Premium:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

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
            Mở khóa toàn bộ trải nghiệm thiền và yoga 🌿
          </p>
        </div>

        {/* ✅ Nếu đã nâng cấp Premium */}
        {isPremium || upgraded ? (
          <div className="text-center mt-10 bg-teal-50 rounded-2xl p-10 shadow-inner border-2 border-teal-200 animate-fade-in">
            <CheckCircle className="text-teal-500 mx-auto mb-4" size={56} />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Bạn đã là thành viên Premium 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã ủng hộ ZenFlow! Hãy tận hưởng trải nghiệm tốt nhất
              cùng âm thanh và bài tập cao cấp.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="bg-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all"
            >
              Quay lại Trang chính
            </button>
          </div>
        ) : (
          <>
            {/* 🧩 Quyền lợi Premium */}
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
                  desc: "50+ bản nhạc thiền độc quyền",
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
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* 💰 Các gói nâng cấp */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Monthly plan */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Hàng tháng
                </h3>
                <p className="text-4xl font-bold text-teal-600 mb-4">
                  199.000₫
                  <span className="text-lg text-gray-600">/tháng</span>
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
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold hover:bg-teal-600 transition-all flex justify-center items-center"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : (
                    "Đăng ký ngay"
                  )}
                </button>
              </div>

              {/* Yearly plan */}
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-xl border-4 border-yellow-300 relative">
                <div className="absolute -top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Tiết kiệm 30%
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Hàng năm</h3>
                <p className="text-4xl font-bold text-white mb-1">
                  1.680.000₫<span className="text-lg">/năm</span>
                </p>
                <p className="text-white/90 text-sm mb-4">Chỉ 140.000₫/tháng</p>
                <ul className="space-y-3 mb-6 text-white">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} /> Tất cả tính năng Premium
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} /> Tặng 2 tháng miễn phí
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} /> Ưu tiên hỗ trợ 24/7
                  </li>
                </ul>
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full bg-white text-orange-600 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all flex justify-center items-center"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : (
                    "Mua gói năm"
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        <p className="text-center text-gray-600 text-sm mt-8">
          7 ngày dùng thử miễn phí • Hủy bất cứ lúc nào • Thanh toán an toàn
        </p>
      </div>
    </div>
  );
}
