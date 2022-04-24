import {createRouter, createWebHistory} from "vue-router";

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon.
  { path: '/', component: ()=>import('./views/RegisterFlow') },
  { path: '/table/:room_name', component: ()=>import('./views/RetroTable') },
  { path: '/room', component: ()=>import('./views/RegisterRoom') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
});