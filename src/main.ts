import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Axios from "axios";

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
Vue.config.productionTip = false;

//TODO PANEL ADMINA:
//todo ekran listy konia (z usuwaniem na iksie)
//todo ekran listy judge (z usuwaniem na iksie)
//todo ekran listy rank (z usuwaniem na iksie)
//todo ekran listy contest (z usuwaniem na iksie)

//todo ekran dodawania konia
//todo ekran dodawania judge
//todo ekran dodawania rank
//todo ekran dodawania contest

//todo ekran edytowania konia
//todo możliwość przeniesienia konia z klasy do klasy (jakis ladny dropdown do wyboru jednej z klas) przy edycji konia.
//todo ekran edytowania judge
//todo ekran edytowania rank
//todo ekran edytowania contest
//todo możliwość edycji komisji sędziowskich dla poszczególnych klas (zaznaczenie checkboxem kto ma być w komisji) przy edycji klasy.
//todo możliwość zmiany numerów startowych koni (osobny ekran) - lista od 0 do X. Każdy rząd ma swój numer i swojego konia.
// Możliwość przestawiania w kolejnosci koni [co zmienia im numer].
// Po kliknieciu w numer - edycja numeru, po zaakceptowaniu enterem zmienia sie kolejnosc na liscie.
// Po zapisie wysyła się do api.

//TODO PANEL KIBICA
//todo  możliwość obserwowania klasyfikacji w poszczególnych klasach (dane przesyłane „na żywo” przez Websockets – socket.io)
//todo  możliwośc podejrzenia rankingów klas już zakończonych

//TODO PANEL PROWADZĄCEGO POKAZ
//todo Najważniejszy element to wprowadzanie ocen spływających od poszczególnych sędziów (t, g, k, n, r) – każda nota jest liczbą z przedziału [0..20], ze stopniowaniem 0.5.
//todo logowanie bo stałych passach np. admin admin

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
