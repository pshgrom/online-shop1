<template>
    <ul v-if="pageCount" class="pagination mt-5">
      <li
        class="page-item"
        v-for="page in pageCount"
      >
        <a
          class="page-link"
          :class="{'active': page === currentPage}"
          @click="setPageHandler(page)"
          href="#"
        >
          {{ page }}
        </a>
      </li>
    </ul>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Pagination",
  setup() {
    const store = useStore();
    const totalCount = computed(() => store.getters.totalCount);
    const limit = computed(() => store.getters.limit);
    const currentPage = computed(() => store.getters.page);

    const pageCount = computed(() => Math.ceil(totalCount.value / limit.value))

    const setPageHandler = (page) => {
      store.dispatch('setPage', page)
    }

    return {
      pageCount,
      currentPage,
      setPageHandler
    }
  }
}
</script>

<style scoped>

</style>
