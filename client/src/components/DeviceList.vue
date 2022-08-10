<template>
  <div class="row d-flex">
    <DeviceItem
      v-for="item in devices"
      :key="item.id"
      :device="item"
    />
  </div>
</template>

<script>
import DeviceItem from "./DeviceItem.vue";
// import DeviceItem from "@/components/DeviceItem.vue";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "DeviceList",
  components: {
    DeviceItem
  },
  setup() {
    const store = useStore();
    const devices = computed(() => store.getters.devices);

    return {
      devices
    }
  }
}
</script>

<style scoped>

</style>
