import { FirebaseApp, initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { Analytics, getAnalytics } from "firebase/analytics";

export default class CustomFirebaseApp {
  app: FirebaseApp;
  analytics: Analytics

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.analytics = getAnalytics(this.app)    
  }
}