import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Dán đúng thông tin Firebase của bạn ở đây:
const firebaseConfig = {
    apiKey: "AIzaSyB7jnELoz-NsbAHSlDCKCiQ_qdGy7CXwO4",
    authDomain: "zenflowapp-185e8.firebaseapp.com",
    projectId: "zenflowapp-185e8",
    storageBucket: "zenflowapp-185e8.firebasestorage.app",
    messagingSenderId: "974438415141",
    appId: "1:974438415141:web:b5b7a5200374da5e04b8cc",
    measurementId: "G-Z0J7LDTZN2"
};

// 🚀 Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// 🔐 Dịch vụ xác thực
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ☁️ Firestore Database
export const db = getFirestore(app);

// 🧠 Đăng nhập Google Popup
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user; // ✅ trả lại user thật
    } catch (error) {
        console.error("🔥 Lỗi đăng nhập Google:", error);
        alert("Lỗi đăng nhập Google: " + error.message);
        return null;
    }
};

// 🚪 Đăng xuất
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("🔥 Lỗi đăng xuất:", error);
    }
};
