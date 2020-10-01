import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCgQkVDhPci42Em8DY745Yd0KB1_4PwEpE",
  authDomain: "clone-a9872.firebaseapp.com",
  databaseURL: "https://clone-a9872.firebaseio.com",
  projectId: "clone-a9872",
  storageBucket: "clone-a9872.appspot.com",
  messagingSenderId: "875342662303",
  appId: "1:875342662303:web:af92cf8d2db6916ee530aa",
  measurementId: "G-ZEXLSXP8X1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ experimentalForceLongPolling: true })
const db = firebaseApp.firestore()

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;