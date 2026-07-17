import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDQd9JqRJaBeUWTZPCWSXv1kB22K5To1-8",
    authDomain: "avtokran-admin.firebaseapp.com",
    projectId: "avtokran-admin",
    storageBucket: "avtokran-admin.firebasestorage.app",
    messagingSenderId: "239323270126",
    appId: "1:239323270126:web:1e75f3bc5896ea4b389cff"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
 export const db = getFirestore(app);