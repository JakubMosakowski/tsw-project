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
//TODO PANEL ADMINA:
//todo ekran listy judge (z usuwaniem na iksie) (z handlowaniem errorów)
//todo ekran dodawania judge
//todo ekran edytowania judge

//todo ekran listy rank (z usuwaniem na iksie) (z handlowaniem errorów)
//todo ekran dodawania rank
//todo ekran edytowania rank
//todo możliwość edycji komisji sędziowskich dla poszczególnych klas (zaznaczenie checkboxem kto ma być w komisji) przy edycji klasy.

//TODO wystaw stronkę na netlify.

//TODO opcjonalnie:
//todo checkbox na ustawianie zakończonych.
//todo poprawki cssow
//todo szukajka na stronie koni/sędziw/rank/notesPanel/klient
//todo sprawdz na innych przegladarkach (firefox/chrome/edge)
//todo sprawdz jak dziala na telefonach

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
