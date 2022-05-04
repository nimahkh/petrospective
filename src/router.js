import {createRouter, createWebHistory} from "vue-router";

// these are passed to `createRouter`
const routes = [
  // dynamic segments start with a colon.
  { path: '/', alias: '/room' , component: ()=>import('./views/RegisterRoom')},
  { path: '/table/:room_name', component: ()=>import('./views/RetroTable') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
});