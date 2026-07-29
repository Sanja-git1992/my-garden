import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDfdeNrzq9IaHB06HWIapH4ybALIyMLyVg',
    authDomain: 'my-garden-b4d7e.firebaseapp.com',
    projectId: 'my-garden-b4d7e',
    storageBucket: 'my-garden-b4d7e.firebasestorage.app',
    messagingSenderId: '669423795484',
    appId: '1:669423795484:web:0fa949620306152089ced9',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)