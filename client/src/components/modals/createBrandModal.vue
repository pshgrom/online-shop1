<template>
  <div class="modal-create" v-if="openCreateBrandModal">
    <div class="modal-create__content">
      <div class="modal-create__header">
        Добавить бренд
      </div>
      <div class="modal-create__body">
        <form action="">
          <input
            v-model="currentBrand"
            class="form-control mt-2"
            placeholder="Введите название типа"
          >
        </form>
      </div>
      <div class="modal-create__footer">
        <button
            @click="closeModal"
            class="btn btn-outline-danger"
            style="margin-right: 10px"
        >
          Закрыть
        </button>
        <button
            @click="addBrandHandler"
            class="btn btn-outline-success"
        >
          Добавить
        </button>
      </div>
    </div>
    <div
        @click="closeModal"
        class="modal-create__overlay"
    />
  </div>
</template>


<script>
import {createBrand} from "../../api/device";
import {ref} from "vue";

export default {
  name: "createBrandModal",
  props: {
    openCreateBrandModal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const currentBrand = ref('')

    const closeModal = () => {
      emit('changeOpenCreateBrandModal', false)
    }

    const addBrandHandler = async () => {
      try {
        const data = {
          name: currentBrand.value
        }
        await createBrand(data)
        currentBrand.value = ''
        closeModal()
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    return {
      closeModal,
      addBrandHandler,
      currentBrand
    }
  }
}
</script>
