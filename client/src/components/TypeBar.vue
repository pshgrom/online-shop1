<template>
  <ul class="list-group">
    <li
      v-for="item in types"
      :key="item.id"
      class="list-group-item list-group-item-action"
      style="cursor: pointer"
      :class="{'active': item.id === selectedType.id}"
      @click="setSelectedTypeHandler(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "TypeBar",
  setup() {
    const store = useStore();
    const types = computed(() => store.getters.types);
    const selectedType = computed(() => store.getters.selectedType);

    const setSelectedTypeHandler = (type) => {
      store.dispatch('setSelectedType', type)
    }

    return {
      types,
      setSelectedTypeHandler,
      selectedType
    }
  }
}
</script>
