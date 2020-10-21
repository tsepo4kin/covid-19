import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Countries from "../components/Countries.vue"
import Country from '../components/Country.vue'
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/countries',
    name: 'Countries',
    component: Countries
  },
  {
    path: '/country/:queryName',
    name: 'Country',
    component: Country,
    props: true,
    beforeEnter(to, from, next) {
      let queryName = to.params.queryName
      store.dispatch('setNewCurrCountry', queryName)
      next()
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
