const firebaseConfig = {
  apiKey: "AIzaSyD-f-UF3nM-R1TSMegY7lW9szHoS7f3WJI",
  authDomain: "armorel-3e2bf.firebaseapp.com",
  projectId: "armorel-3e2bf",
  storageBucket: "armorel-3e2bf.appspot.com",
  messagingSenderId: "899798221811",
  appId: "1:899798221811:web:f90cba6fb4e52f496f0886",
  measurementId: "G-PXTNXCTHRG"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
