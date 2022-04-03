import {createRouter, createWebHistory} from "vue-router";

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon.
  { path: '/', component: ()=>import('./views/RegisterFlow') },
  { path: '/table', component: ()=>import('./views/RetroTable') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
});