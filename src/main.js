import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyDUmPrH918Q4uOOATAKrFJ351mKuIGzTjo",
  authDomain: "cs494-vuejs.firebaseapp.com",
  databaseURL: "https://cs494-vuejs.firebaseio.com",
  projectId: "cs494-vuejs",
  storageBucket: "cs494-vuejs.appspot.com",
  messagingSenderId: "486172568661"
};

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')