import * as firebase from 'firebase';

const prodConfig = {
  // apiKey: "AIzaSyBRA6IiicWrMXgNy6RTnP72D4jLe8E2Qm0",
  // authDomain: "auth-app-production.firebaseapp.com",
  // databaseURL: "https://auth-app-production.firebaseio.com",
  // projectId: "auth-app-production",
  // storageBucket: "auth-app-production.appspot.com",
  // messagingSenderId: "703155886519"
};

const devConfig = {
  // apiKey: "AIzaSyCFcRex8gLd1Jwde20HP2ue6iV43w7ZsnI",
  // authDomain: "authentication-app-45b53.firebaseapp.com",
  // databaseURL: "https://authentication-app-45b53.firebaseio.com",
  // projectId: "authentication-app-45b53",
  // storageBucket: "authentication-app-45b53.appspot.com",
  // messagingSenderId: "304269722396"
};

  const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;


  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const db = firebase.database();

    export {
      db,
    auth,
    };