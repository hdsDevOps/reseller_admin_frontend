import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBDhOqLuQygzeZL-V1xqJkW37kpfiyHrgA",
  authDomain: "dev-hds-gworkspace.firebaseapp.com",
  projectId: "dev-hds-gworkspace",
  storageBucket: "dev-hds-gworkspace.firebasestorage.app",
  messagingSenderId: "219633037656",
  appId: "1:219633037656:web:fc42abbfa637bebe7af52d",
  measurementId: "G-6HEYYHS6H0"
}

const firebaseConfiguration = initializeApp(firebaseConfig);

export default firebaseConfiguration;