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
//TODO przycisk do odśiweżania bazy
//todo ekran listy konia (z usuwaniem na iksie)
//todo przejście do szczegółów konia
//todo ekran listy judge (z usuwaniem na iksie)
//todo ekran listy rank (z usuwaniem na iksie)

//todo ekran dodawania konia
//todo ekran dodawania judge
//todo ekran dodawania rank
//TODO checkbox na ustawianie zakończonych.
//todo wystaw stronkę na netlify

//todo ekran edytowania konia
//todo możliwość przeniesienia konia z klasy do klasy (jakis ladny dropdown do wyboru jednej z klas) przy edycji konia.
//todo ekran edytowania judge
//todo ekran edytowania rank
//todo możliwość edycji komisji sędziowskich dla poszczególnych klas (zaznaczenie checkboxem kto ma być w komisji) przy edycji klasy.
//todo możliwość zmiany numerów startowych koni (osobny ekran) - lista od 0 do X. Każdy rząd ma swój numer i swojego konia.
// Możliwość przestawiania w kolejnosci koni [co zmienia im numer].
// Po kliknieciu w numer - edycja numeru, po zaakceptowaniu enterem zmienia sie kolejnosc na liscie.
// Po zapisie wysyła się do API.

//TODO PANEL KIBICA
//todo  możliwość obserwowania klasyfikacji w poszczególnych klasach (dane przesyłane „na żywo” przez Websockets – socket.io)

//TODO sprawdz na innych przegladarkach (firefox/chrome/edge)
//TODO sprawdz jak dziala na telefonach
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
