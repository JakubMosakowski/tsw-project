import Vue from "vue";
import Router from "vue-router";
import Home from "@/home/Home.vue";
import AdminsPanel from "@/adminPanel/AdminPanel.vue";
import NotesPanel from "@/notesPanel/NotesPanel.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/adminPanel",
      name: "adminPanel",
      component: AdminsPanel
    },
    {
      path: "/notesPanel",
      name: "notesPanel",
      component: NotesPanel
    }
  ]
});
