<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col col-3">
        <TypeBar />
      </div>
      <div class="col col-9">
        <BrandBar />
        <DeviceList />
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script>
import TypeBar from "../components/TypeBar.vue";
import BrandBar from "../components/BrandBar.vue";
import DeviceList from "../components/DeviceList.vue";
import Pagination from "../components/Pagination.vue";
import {computed, onMounted, watch} from "vue";
import {fetchBrands, fetchDevices, fetchTypes} from "../api/device";
import {useStore} from "vuex";

export default {
  name: "Shop",
  components: {
    TypeBar,
    BrandBar,
    DeviceList,
    Pagination
  },
  setup() {
    const store = useStore();
    const currentPage = computed(() => store.getters.page);
    const limit = computed(() => store.getters.limit);
    const selectedType = computed(() => store.getters.selectedType);
    const selectedBrand = computed(() => store.getters.selectedBrand);

    const getTypes = async() => {
      try {
        const types = await fetchTypes()
        await store.dispatch('setTypes', types)
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    const getBrands = async() => {
      try {
        const brands = await fetchBrands()
        await store.dispatch('setBrands', brands)
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    const getDevices = async() => {
      try {
        const devices = await fetchDevices(selectedType.value.id, selectedBrand.value.id, currentPage.value, limit.value)
        await store.dispatch('setDevices', devices.rows)
        await store.dispatch('setTotalCount', devices.count)
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    watch(
      () => [currentPage.value, selectedType.value.id, selectedBrand.value.id],
      () => {
        getDevices()
      },
    );

    onMounted(() => {
      getTypes()
      getBrands()
      getDevices()
    })
  }
}
</script>

<style scoped>

</style>
