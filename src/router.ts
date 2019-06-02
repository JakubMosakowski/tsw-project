import Vue from "vue";
import Router from "vue-router";
import Home from "@/home/Home.vue";
import AdminsPanel from "@/adminPanel/AdminPanel.vue";
import NotesPanel from "@/notesPanel/NotesPanel.vue";
import Login from "@/login/Login.vue";
import store from "@/store/store";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/adminPanel",
      name: "adminPanel",
      component: AdminsPanel,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/notesPanel",
      name: "notesPanel",
      component: NotesPanel,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/home");
  } else {
    next();
  }
});

export default router;
