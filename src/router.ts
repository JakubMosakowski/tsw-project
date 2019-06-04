import Vue from "vue";
import Router from "vue-router";
import Home from "@/presentation/home/Home.vue";
import AdminsPanel from "@/presentation/adminPanel/AdminPanel.vue";
import NotesPanel from "@/presentation/notesPanel/NotesPanel.vue";
import Login from "@/presentation/login/Login.vue";
import store from "@/data/store/store";
import Horses from "@/presentation/adminPanel/components/Horses.vue";
import HorseDetail from "@/presentation/adminPanel/components/HorseDetail.vue";
import HorseReorder from "@/presentation/adminPanel/components/HorseReorder.vue";

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
    },
    {
      path: "/contests",
      name: "contests",
      component: NotesPanel,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horseReorder",
      name: "horseReorder",
      component: HorseReorder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horses/:id",
      name: "horseDetail",
      component: HorseDetail,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/horses",
      name: "horses",
      component: Horses,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/judges",
      name: "judges",
      component: NotesPanel,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ranks",
      name: "ranks",
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
