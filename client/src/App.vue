<template>
  <div v-if="loading" class="loader">
    <div class="lds-dual-ring"></div>
  </div>
  <template v-else>
    <NavBar />
    <RouterView />
  </template>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import {onMounted, ref} from "vue";
import {check} from "./api/user";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  components: {NavBar},
  setup() {
    const loading = ref(true)
    const store = useStore();
    const router = useRouter()

    const checkUser = async () => {
      try {
        const data = await check()
        await store.dispatch('setAuth', true)
        await store.dispatch('setCurrentUser', data)
      } catch (e) {
        alert(e.response.data.message)
        router.push('/login').then(r => r)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      checkUser()
    })

    return {
      loading
    }
  }
}

</script>

<style>
.loader {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.4);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>

