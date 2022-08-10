<template>
  <div class="modal-create" v-if="openCreateTypeModal">
    <div class="modal-create__content">
      <div class="modal-create__header">
        Добавить тип
      </div>
      <div class="modal-create__body">
        <form action="">
          <input
            v-model="currentType"
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
          class="btn btn-outline-success"
          @click="addTypeHandler"
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
import {ref} from "vue";
import {createType} from "../../api/device";

export default {
  name: "createTypeModal",
  props: {
    openCreateTypeModal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const currentType = ref('')

    const closeModal = () => {
      emit('changeOpenCreateTypeModal', false)
    }

    const addTypeHandler = async () => {
      try {
        const data = {
          name: currentType.value
        }
        await createType(data)
        currentType.value = ''
        closeModal()
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    return {
      closeModal,
      addTypeHandler,
      currentType
    }
  }
}
</script>
