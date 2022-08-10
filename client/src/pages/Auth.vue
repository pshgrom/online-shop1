<template>
  <div class="container">
    <div class="card p-5 m-auto" style="width: 600px">
      <div class="card-body">
        <h2 class="text-center">
          {{ isLogin ? 'Авторизация' : 'Регистрация'}}
        </h2>
        <form class="row g-3">
          <div class="mb-3">
            <input
              v-model="email"
              class="form-control mt-2"
              placeholder="Введите ваш email..."
            >
          </div>
          <div class="mb-3">
            <input
              v-model="password"
              class="form-control"
              placeholder="Введите ваш пароль..."
              type="password"
            >
          </div>
          <div class="row g-3 d-flex justify-content-between mt-3">
            <div v-if="isLogin">
              Нет аккаунта? <RouterLink to="/registration">Зарегистрируйся</RouterLink>
            </div>
            <div v-else>
              Есть аккаунт? <RouterLink to="/login">Войдите</RouterLink>
            </div>
            <button
              type="button"
              class="btn btn-success"
              @click="click"
            >
              {{ isLogin ? 'Войти' : 'Регистрация'}}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import {computed, ref} from "vue";
import {login, registration} from "../api/user";
import {useStore} from "vuex";
import {SHOP_ROUTE} from "../constant/paths";

export default {
  name: "Auth",
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const isLogin = computed(() => route.name === 'login')

    const click = async () => {
      try {
        let data
        if(isLogin.value) {
          data = await login(email.value, password.value)
        } else {
          data = await registration(email.value, password.value)
        }
        await store.dispatch('setCurrentUser', data)
        await store.dispatch('setAuth', true)
        await router.push(SHOP_ROUTE)
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    return {
      isLogin,
      click,
      email,
      password
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
