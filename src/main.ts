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
  faSort,
  faMedal
} from "@fortawesome/free-solid-svg-icons";

library.add(faEdit);
library.add(faFlag);
library.add(faTrash);
library.add(faPlus);
library.add(faSort);
library.add(faMedal);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
//TODO opcjonalnie:
//todo poprawki cssow
//todo sprawdz na innych przegladarkach (firefox/chrome/edge)
//todo sprawdz jak dziala na telefonach

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
