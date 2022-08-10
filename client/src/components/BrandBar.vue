<template>
  <div class="row">
    <div
      v-for="item in brands"
      :key="item.id"
      class="card card-item p-3"
      style="width: 10rem; cursor: pointer"
      :class="item.id === selectedBrand.id ? 'border-danger' : 'border-light'"
      @click="setSelectedBrandHandler(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "BrandBar",
  setup() {
    const store = useStore();
    const brands = computed(() => store.getters.brands);
    const selectedBrand = computed(() => store.getters.selectedBrand);

    const setSelectedBrandHandler = (brand) => {
      store.dispatch('setSelectedBrand', brand)
    }

    return {
      brands,
      selectedBrand,
      setSelectedBrandHandler
    }
  }
}
</script>

<style lang="scss">
  .card {
    &-item {
      border: 1px solid transparent;
    }
  }
</style>
