<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col col-4">
        <div style="display: flex; justify-content: center">
          <img
            :src="`http://localhost:5000/${device.img}`"
            alt=""
            style="width: 300px; height: 300px">
        </div>
      </div>
      <div class="col col-4">
        <div class="row d-flex flex-column align-items-center">
          <h2 class="text-center">{{ device.name }}</h2>
          <div
            class="d-flex align-items-center justify-content-center"
            :style="{background: `url(${bigStar}) no-repeat center center`}"
            style="width:240px; height:240px; background-size: cover; font-size: 64px"
          >
            {{ device.rating }}
          </div>
        </div>
      </div>
      <div class="col col-4">
        <div
          class="card d-flex align-items-center justify-content-center"
          style="width: 300px; height: 300px; font-size: 32px; border: 5px solid lightgray;"
        >
          <h3>От: {{ device.price }} руб.</h3>
          <button class="btn btn-outline-dark" type="button">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
    <div class="row d-flex flex-column m-3">
      <h1>Характеристики</h1>
      <div
        class="row"
        v-for="(item, index) in device.info"
        :key="item.id"
        :style="{background: index % 2 === 0 ? 'lightgray' : 'transparent'}"
        style="padding: 10px"
      >
        {{ item.title }}: {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import bigStar from '../assets/bigStar.png'
import {useRoute} from "vue-router";
import {fetchOneDevice} from "../api/device";

export default {
  name: "Device",
  setup() {
    const route = useRoute();

    const device = ref({
      info: []
    })

    const description = ref([])

    const getOneDevice = async () => {
      try {
        const curDevice = await fetchOneDevice(route.params.id)
        device.value = curDevice
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    onMounted(() => {
      getOneDevice()
    })

    return {
      device,
      bigStar,
      description
    }
  }
}
</script>

<style scoped>

</style>
