import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Autho from "../components/Autho.vue"
import store from "../store"
import Todo from "../views/Todo"

Vue.use(VueRouter);

const routes = [
  {
    path: "/vue",
    name: "Home",
    meta: {requiresAuth:true},
    component: Home,
  },
  {
    path: "/",
    redirect: "/auth"
  },
  {
    path: "/about",
    name: "About",
    meta: {requiresAuth:true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component:Autho,
    // meta: {requiresAuth:false}
  },
  {
    path: "/home",
    name: "todo",
    component:Todo,
    meta: {requiresAuth:true}
  }
  // {
  //   path: "/signup",
  //   name: "Signup",
  //   component: () => 
  //     import("../components/Signup.vue"),
  // }
];


const router = new VueRouter({
  mode: 'history',
  routes,
});
router.beforeEach( async (to, from, next) => {
  if (to.matched.some( item => item.meta.requiresAuth)){
    try {
      const user = await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      store.dispatch('toggle', true)
      let details = user.attributes 
      details.username = user.username
      store.dispatch('setuser', details)
      return next()
    } catch (error) {
      store.dispatch('setuser', {})
      store.dispatch('toggle', false)
      next("/auth")
    }
  }
  return next()  
})
export default router;
