// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsF7jVJ2WZfGIqWDQKE8-40LRjgEcEBu8",
  authDomain: "cwift-marketplace.firebaseapp.com",
  projectId: "cwift-marketplace",
  storageBucket: "cwift-marketplace.appspot.com",
  messagingSenderId: "925578910063",
  appId: "1:925578910063:web:485a4910d6ac79d207309a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);