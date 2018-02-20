import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "Put your apiKey",
    authDomain: "Put your auth Domain",
    databaseURL: "Put your databaseURL",
    projectId: "Put yours",
    storageBucket: "Put yours",
    messagingSenderId: "Put yours"
  };

  const devConfig = {
    apiKey: "Put your apiKey",
    authDomain: "Put your auth Domain",
    databaseURL: "Put your databaseURL",
    projectId: "Put yours",
    storageBucket: "Put yours",
    messagingSenderId: "Put yours"
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