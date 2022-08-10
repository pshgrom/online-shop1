<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">
        <RouterLink
          v-if="isAuth"
          style="color: white;
          text-decoration: none"
          to="/shop"
        >
          Купи Девайс
        </RouterLink>
        <RouterLink
          v-else
          style="color: white;
          text-decoration: none"
          to="/login"
        >
          Купи Девайс
        </RouterLink>
      </a>
      <div class="collapse navbar-collapse justify-content-end" id="navbarScroll">
        <ul class="navbar-nav my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <template v-if="isAuth">
            <button
              type="button"
              class="btn btn-light"
              style="margin-right: 10px"
              @click="goToPage(admin)"
            >
              Админ панель
            </button>
            <button
              type="button"
              class="btn btn-light"
              @click="logout()"
            >
              Выйти
            </button>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../constant/paths";

export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    const router = useRouter()
    const isAuth = computed(() => store.getters.isAuth);
    const admin = ADMIN_ROUTE
    const login = LOGIN_ROUTE

    const goToPage = (page) => {
      router.push(page)
    }

    const logout = () => {
      store.dispatch('logout')
    }

    return {
      isAuth,
      goToPage,
      logout,
      admin,
      login
    }
  }
}
</script>

<style scoped>

</style>
