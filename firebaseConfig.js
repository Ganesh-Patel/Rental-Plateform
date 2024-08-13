
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDxcKmaz7Ud6h-7SkCxlKM8x0H-lMuosMg",
  authDomain: "realstate-9e32d.firebaseapp.com",
  projectId: "realstate-9e32d",
  storageBucket: "realstate-9e32d.appspot.com",
  messagingSenderId: "979399273255",
  appId: "1:979399273255:web:d70761ec0c949884b09702"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;