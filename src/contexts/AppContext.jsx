import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { save, load } from "../utils/storage";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 🧠 1. Trạng thái người dùng & Premium
  const [user, setUser] = useState(load("user", null));
  const [isPremium, setIsPremium] = useState(load("isPremium", false));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL,
        };
        setUser(userData);
        save("user", userData);

        try {
          const ref = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data();
            setIsPremium(data.isPremium || false);
            save("isPremium", data.isPremium || false);

            if (data.goal) save("selectedGoal", data.goal);
            if (data.mood) save("mood", data.mood);
          } else {
            await setDoc(ref, { isPremium: false }, { merge: true });
          }
        } catch (err) {
          console.error("⚠️ Lỗi khi load dữ liệu người dùng:", err);
        }
      } else {
        setUser(null);
        setIsPremium(false);
        save("user", null);
        save("isPremium", false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🌿 2. Trạng thái app
  const [zenMode, setZenMode] = useState(load("zenMode", false));
  const [selectedSound, setSelectedSound] = useState(
    load("selectedSound", "Tiếng suối")
  );
  const [selectedDuration, setSelectedDuration] = useState(
    load("selectedDuration", 300)
  );
  const [notifications, setNotifications] = useState(
    load("notifications", true)
  );

  // 🌱 3. Onboarding
  const [selectedGoal, setSelectedGoal] = useState(load("selectedGoal", ""));
  const [mood, setMood] = useState(load("mood", ""));

  // 🕒 4. Thiền
  const [meditationTimer, setMeditationTimer] = useState(selectedDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breathAnimation, setBreathAnimation] = useState("inhale");
  const [completedToday, setCompletedToday] = useState(
    load("completedToday", false)
  );

  // 📈 5. Thống kê người dùng
  const [userStats, setUserStats] = useState(
    load("userStats", {
      streak: 7,
      totalSessions: 42,
      totalMinutes: 630,
      currentLevel: 5,
      nextLevelProgress: 65,
    })
  );

  // 💬 6. Câu nói ngẫu nhiên
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

  // 🕰️ 7. Logic Timer
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
        totalMinutes: prev.totalMinutes + selectedDuration / 60,
        nextLevelProgress: Math.min(prev.nextLevelProgress + 10, 100),
        streak: prev.streak + 1,
      }));
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, meditationTimer, selectedDuration]);

  // 🌬️ 8. Hiệu ứng hít-thở
  useEffect(() => {
    if (isTimerRunning) {
      const cycle = setInterval(() => {
        setBreathAnimation((prev) => (prev === "inhale" ? "exhale" : "inhale"));
      }, 4000);
      return () => clearInterval(cycle);
    }
  }, [isTimerRunning]);

  // 💾 9. Lưu localStorage
  useEffect(() => save("userStats", userStats), [userStats]);
  useEffect(() => save("isPremium", isPremium), [isPremium]);
  useEffect(() => save("selectedSound", selectedSound), [selectedSound]);
  useEffect(
    () => save("selectedDuration", selectedDuration),
    [selectedDuration]
  );
  useEffect(() => save("zenMode", zenMode), [zenMode]);
  useEffect(() => save("notifications", notifications), [notifications]);
  useEffect(() => save("completedToday", completedToday), [completedToday]);
  useEffect(() => save("selectedGoal", selectedGoal), [selectedGoal]);
  useEffect(() => save("mood", mood), [mood]);
  useEffect(() => save("meditationTimer", meditationTimer), [meditationTimer]);

  // 🌟 10. Cung cấp cho toàn app
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isPremium,
        setIsPremium,
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
        userStats,
        setUserStats,
        mood,
        setMood,
        selectedGoal,
        setSelectedGoal,
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
