import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useApp } from "../contexts/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DashboardScreen() {
  const { user } = useApp();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
  });

  // 📊 Lấy dữ liệu từ Firestore
  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      const q = query(
        collection(db, "sessions"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate?.().toLocaleDateString("vi-VN"),
      }));
      setSessions(data);

      // 📈 Tính toán thống kê
      const totalMinutes = data.reduce((sum, s) => sum + s.duration / 60, 0);
      const totalSessions = data.length;
      const today = new Date().toLocaleDateString("vi-VN");
      const streak = data.some((s) => s.date === today) ? 1 : 0; // đơn giản hóa streak (sau có thể tính nâng cao)
      setStats({ totalMinutes, totalSessions, streak });
    };

    fetchSessions();
  }, [user]);

  // 📅 Gom nhóm theo ngày
  const groupedData = sessions.reduce((acc, s) => {
    const existing = acc.find((d) => d.date === s.date);
    if (existing) existing.minutes += s.duration / 60;
    else acc.push({ date: s.date, minutes: s.duration / 60 });
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        📊 Thống kê thiền
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-teal-600">
            {stats.totalSessions}
          </p>
          <p className="text-gray-500 text-sm">Buổi thiền</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-teal-600">
            {stats.totalMinutes}
          </p>
          <p className="text-gray-500 text-sm">Phút thiền</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-teal-600">{stats.streak}</p>
          <p className="text-gray-500 text-sm">Ngày streak</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          ⏱️ Biểu đồ thời gian thiền theo ngày
        </h3>
        {groupedData.length === 0 ? (
          <p className="text-gray-500">Chưa có dữ liệu thiền.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{ value: "Phút", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="minutes" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
