import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";



const firebaseApp = initializeApp({

  apiKey: "AIzaSyBi1UgAPyNVs_7xT_wIq8FoqmzrcgUFW9Y",  

  authDomain: "messenger-clone-76ce9.firebaseapp.com",

  projectId: "messenger-clone-76ce9",

  storageBucket: "messenger-clone-76ce9.appspot.com",

  messagingSenderId: "223316521489",

  appId: "1:223316521489:web:0a34744c3b6890bc5c37b0"

});

const database=getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export {database,auth};