import Vue from "vue";
import App from "./presentation/App.vue";
import router from "./router";
import store from "./data/store/modules/root/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEdit,
  faTrash,
  faFlag,
  faPlus,
  faSort
} from "@fortawesome/free-solid-svg-icons";

library.add(faEdit);
library.add(faFlag);
library.add(faTrash);
library.add(faPlus);
library.add(faSort);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
//TODO sprawdz czy działa ta zakończona klasa
//TODO niech wera all testuje na netlify

//TODO opcjonalnie:
//todo szukajka na stronie koni/sędziw/rank/notesPanel/klient
//todo poprawki cssow
//todo sprawdz na innych przegladarkach (firefox/chrome/edge)
//todo sprawdz jak dziala na telefonach

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
