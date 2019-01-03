import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: 'AIzaSyA8kk8IoC1ixA64Vc5R6jqS4q3cQi79nkw',
  authDomain: 'react-messenger-f0469.firebaseapp.com',
  databaseURL: 'https://react-messenger-f0469.firebaseio.com',
  projectId: 'react-messenger-f0469',
  storageBucket: 'react-messenger-f0469.appspot.com',
  messagingSenderId: '538333283822'
};
firebase.initializeApp(config);

export default firebase;
