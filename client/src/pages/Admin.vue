<template>
  <div class="container d-flex flex-column ">
    <button
      @click="changeOpenCreateTypeModal(true)"
      class="btn btn-outline-dark mt-2 p-2"
    >
      Добавить тип
    </button>
    <button
      @click="changeOpenCreateBrandModal(true)"
      class="btn btn-outline-dark mt-2 p-2"
    >
      Добавить бренд
    </button>
    <button
      @click="changeOpenCreateDeviceModal(true)"
      class="btn btn-outline-dark mt-2 p-2"
    >
      Добавить устройства
    </button>
  </div>
  <createTypeModal
    :openCreateTypeModal="openCreateTypeModal"
    @changeOpenCreateTypeModal="changeOpenCreateTypeModal"
  />
  <createDeviceModal
    :openCreateDeviceModal="openCreateDeviceModal"
    @changeOpenCreateDeviceModal="changeOpenCreateDeviceModal"
  />
  <createBrandModal
      :openCreateBrandModal="openCreateBrandModal"
      @changeOpenCreateBrandModal="changeOpenCreateBrandModal"
  />
</template>

<script>
import createTypeModal from "../components/modals/createTypeModal.vue";
import createDeviceModal from "../components/modals/createDeviceModal.vue";
import createBrandModal from "../components/modals/createBrandModal.vue";
import {ref} from "vue";

export default {
  name: "Admin",
  components: {
    createTypeModal,
    createBrandModal,
    createDeviceModal
  },
  setup() {
    const openCreateTypeModal = ref(false)
    const openCreateBrandModal = ref(false)
    const openCreateDeviceModal = ref(false)

    const changeOpenCreateTypeModal = (val) => {
      openCreateTypeModal.value = val
    }

    const changeOpenCreateBrandModal = (val) => {
      openCreateBrandModal.value = val
    }

    const changeOpenCreateDeviceModal = (val) => {
      openCreateDeviceModal.value = val
    }

    return {
      changeOpenCreateTypeModal,
      openCreateTypeModal,
      changeOpenCreateBrandModal,
      openCreateBrandModal,
      changeOpenCreateDeviceModal,
      openCreateDeviceModal
    }
  }
}
</script>

<style lang="scss">
.modal-create {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &__body {
    padding: 15px;
    border-bottom: 1px solid gray;
  }

  &__footer {
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 22px;
  }

  &__header {
    font-size: 24px;
    font-weight: bold;
    padding: 15px;
    border-bottom: 1px solid gray;
  }

  &__overlay {
    background: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  &__content {
    background: #fff;
    max-width: 600px;
    width: 100%;
    border-radius: 10px;
    z-index: 20;

  }
}
</style>
