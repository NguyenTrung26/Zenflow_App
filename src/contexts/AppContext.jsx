import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { save, load } from "../utils/storage"; // nhớ tạo file storage.js như hướng dẫn trước đó
import { auth, loginWithGoogle, logout } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 🧩 1. Trạng thái chung (App State)
  const [user, setUser] = useState(load("user", null));
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        });
        save("user", firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [isPremium, setIsPremium] = useState(load("isPremium", false));
  const [zenMode, setZenMode] = useState(load("zenMode", false));
  const [selectedSound, setSelectedSound] = useState(
    load("selectedSound", "Tiếng suối")
  );
  const [selectedDuration, setSelectedDuration] = useState(
    load("selectedDuration", 300)
  );
  const [mood, setMood] = useState(load("mood", ""));
  const [notifications, setNotifications] = useState(
    load("notifications", true)
  );

  // 🕒 2. Thiền / Timer
  const [meditationTimer, setMeditationTimer] = useState(selectedDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breathAnimation, setBreathAnimation] = useState("inhale");
  const [completedToday, setCompletedToday] = useState(
    load("completedToday", false)
  );

  // 📈 3. Thống kê người dùng
  const [userStats, setUserStats] = useState(
    load("userStats", {
      streak: 7,
      totalSessions: 42,
      totalMinutes: 630,
      currentLevel: 5,
      nextLevelProgress: 65,
    })
  );

  // 🧘‍♀️ 4. Mục tiêu & Câu nói
  const [selectedGoal, setSelectedGoal] = useState(load("selectedGoal", ""));
  const aiQuotes = [
    "Hạnh phúc không phải điểm đến, mà là cách bạn đi trên con đường.",
    "Tâm bình thì vạn sự bình, tâm an thì vạn sự an.",
    "Hơi thở là cầu nối giữa thân và tâm.",
    "Mỗi ngày là một cơ hội mới để trở nên tốt đẹp hơn.",
    "Sống trọn vẹn từng khoảnh khắc, đó chính là thiền.",
  ];
  const [dailyQuote] = useState(
    aiQuotes[Math.floor(Math.random() * aiQuotes.length)]
  );

  // 🎯 5. Timer Logic — quản lý đếm thời gian thiền
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning && meditationTimer > 0) {
      timerRef.current = setInterval(() => {
        setMeditationTimer((prev) => prev - 1);
      }, 1000);
    }

    if (meditationTimer === 0 && isTimerRunning) {
      clearInterval(timerRef.current);
      setIsTimerRunning(false);
      setCompletedToday(true);

      setUserStats((prev) => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        totalMinutes: prev.totalMinutes + Math.floor(selectedDuration / 60),
        nextLevelProgress: Math.min(prev.nextLevelProgress + 10, 100),
        streak: prev.streak + 1,
      }));
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, meditationTimer, selectedDuration]);

  // 🌬️ 6. Hiệu ứng hít vào / thở ra
  useEffect(() => {
    if (isTimerRunning) {
      const cycle = setInterval(() => {
        setBreathAnimation((prev) => (prev === "inhale" ? "exhale" : "inhale"));
      }, 4000);
      return () => clearInterval(cycle);
    }
  }, [isTimerRunning]);

  // 💾 7. Lưu dữ liệu tự động (localStorage)
  useEffect(() => save("userStats", userStats), [userStats]);
  useEffect(() => save("isPremium", isPremium), [isPremium]);
  useEffect(() => save("selectedSound", selectedSound), [selectedSound]);
  useEffect(
    () => save("selectedDuration", selectedDuration),
    [selectedDuration]
  );
  useEffect(() => save("selectedGoal", selectedGoal), [selectedGoal]);
  useEffect(() => save("mood", mood), [mood]);
  useEffect(() => save("notifications", notifications), [notifications]);
  useEffect(() => save("completedToday", completedToday), [completedToday]);
  useEffect(() => save("zenMode", zenMode), [zenMode]);
  useEffect(() => save("user", user), [user]);

  // 🔁 8. Khôi phục thời gian khi reload
  useEffect(() => {
    const savedTime = load("meditationTimer", selectedDuration);
    setMeditationTimer(savedTime);
  }, []);

  useEffect(() => save("meditationTimer", meditationTimer), [meditationTimer]);

  // 🌟 9. Trả giá trị ra cho toàn app
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        meditationTimer,
        setMeditationTimer,
        selectedDuration,
        setSelectedDuration,
        isTimerRunning,
        setIsTimerRunning,
        breathAnimation,
        setBreathAnimation,
        zenMode,
        setZenMode,
        selectedSound,
        setSelectedSound,
        isPremium,
        setIsPremium,
        userStats,
        setUserStats,
        selectedGoal,
        setSelectedGoal,
        mood,
        setMood,
        notifications,
        setNotifications,
        completedToday,
        setCompletedToday,
        dailyQuote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
