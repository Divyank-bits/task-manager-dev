import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBQhKu2W8-Ts3VzVuhXhuYCLdCfwPpOKR0",
  authDomain: "task-manager-412306.firebaseapp.com",
  projectId: "task-manager-412306",
  storageBucket: "task-manager-412306.appspot.com",
  messagingSenderId: "17417277768",
  appId: "1:17417277768:web:e4f0afd59b68dae05aa37d",
  measurementId: "G-679VZDQPB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
