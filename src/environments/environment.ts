import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyC3Uo47jlUwfTTm94O6E01aUp05yozoLVU',
    authDomain: 'do-no-harm-3a3d3.firebaseapp.com',
    databaseURL:
      'https://do-no-harm-3a3d3-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'do-no-harm-3a3d3',
    storageBucket: 'do-no-harm-3a3d3.appspot.com',
    messagingSenderId: '667065595632',
    appId: '1:667065595632:web:0585f191a8bbe6fa56b435',
    measurementId: 'G-1QEXV1S5PP',
  },
};
