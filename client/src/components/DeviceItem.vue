<template>
  <div class="col col-3 mt-3" @click="goToDevice(device.id)">
    <div class="card" style="width: auto; cursor: pointer">
      <div class="card__image" >
        <img
          :src="`http://localhost:5000/${device.img}`"
          class="card-img-top mt-3"
          alt="..."
          style="width: 150px; height: 150px;"
        >
      </div>
      <div class="text-black-50 mt-1 card-body d-flex justify-content-between">
        <h5 class="card-title">Card title</h5>
          <div class="d-flex">{{ device.rating }}</div>
        <div>
          <img :src="star" style="width: 18px; height: 18px" alt="">
        </div>
      </div>
      <div class="card-footer">
        {{ device.name }}
      </div>
    </div>
  </div>
</template>

<script>
import star from '../assets/star.png'
import { useRouter } from 'vue-router';
import {DEVICE_ROUTE} from "../constant/paths";

export default {
  name: "DeviceItem",
  props: {
    device: {
      type: Object
    }
  },
  setup() {
    const router = useRouter()

    const goToDevice = (id) => {
      router.push(`${DEVICE_ROUTE}/${id}`)
    }

    return {
      star,
      goToDevice
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  &__image {
    display: flex;
    justify-content: center;
  }
}

</style>
