import { createRouter, createWebHistory } from 'vue-router'
import Admin from "../pages/Admin.vue";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../constant/paths";
import Basket from "../pages/Basket.vue";
import Shop from "../pages/Shop.vue";
import Device from "../pages/Device.vue";
import Auth from "../pages/Auth.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ADMIN_ROUTE,
      name: 'admin',
      component: Admin,
      meta: {
        auth: false
      }
    },
    {
      path: BASKET_ROUTE,
      name: 'basket',
      component: Basket,
      meta: {
        auth: true
      }
    },
    {
      path: SHOP_ROUTE,
      name: 'shop',
      component: Shop,
      meta: {
        auth: false
      }
    },
    {
      path: `${DEVICE_ROUTE}/:id`,
      name: 'device',
      component: Device,
      meta: {
        auth: false
      }
    },
    {
      path: LOGIN_ROUTE,
      name: 'login',
      component: Auth,
      meta: {
        auth: false
      }
    },
    {
      path: REGISTRATION_ROUTE,
      name: 'registration',
      component: Auth,
      meta: {
        auth: false
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'shop',
      component: Shop,
      meta: {
        auth: false
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiredAuth = to.matched.some(record => record.meta.auth)

  if(requiredAuth && !token) {
    next('/login?message=login')
  } else {
    next()
  }
});

export default router
