import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "netflix-clone-2351b.firebaseapp.com",
  projectId: "netflix-clone-2351b",
  storageBucket: "netflix-clone-2351b.appspot.com",
  messagingSenderId: "428375139663",
  appId: "1:428375139663:web:f97a7256c6a357cd9d113a",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Add user details to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Login function
const login = async (email, password) => {
  try {
    // Sign in with email and password
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully");
  } catch (error) {
    console.error("Error during login:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error.message);
    alert(error.message);
  }
};

// Export auth, db, and functions
export { auth, db, login, signup, logout };
