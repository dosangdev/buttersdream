// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpceMzsMiugza2-i_mTlD8uofGUc22pRU",
  authDomain: "butter-s-dream.firebaseapp.com",
  projectId: "butter-s-dream",
  //   storageBucket: "butter-s-dream.firebasestorage.app",
  storageBucket: "butter-s-dream.appspot.com",
  messagingSenderId: "773890702114",
  appId: "1:773890702114:web:1ccd46a418ef7622a7037b",
  measurementId: "G-QQ62LE0ZGS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// 이미 firebaseConfig, app 초기화는 되어 있다고 가정
const storage = getStorage();
const db = getFirestore(app);

export async function uploadImageToFirebase(dataUrl: string, fileName: string) {
  const imageRef = ref(storage, `butter-share/${fileName}.png`);
  await uploadString(imageRef, dataUrl, "data_url");
  const url = await getDownloadURL(imageRef);
  return url; // 업로드된 이미지의 퍼블릭 URL
}

export async function saveImageUrlToFirestore(id: string, imageUrl: string) {
  await setDoc(doc(db, "butter-share", id), { imageUrl });
}

export default app;
