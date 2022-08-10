<template>
  <div class="modal-create" v-if="openCreateDeviceModal">
    <div class="modal-create__content">
      <div class="modal-create__header">
        Добавить девайс
      </div>
      <div class="modal-create__body">
        <form action="" @submit.prevent>
          <div class="dropdown mt-2 mb-2">
            <a
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            {{ selectedType.name || 'Выберите тип'}}
            </a>
            <ul class="dropdown-menu">
              <li
                v-for="item in types"
                :key="item.id"
                @click="setSelectedTypeHandler(item)"
              >
                <a
                  class="dropdown-item"
                  href="#"
                >
                  {{item.name}}
                </a>
              </li>
            </ul>
          </div>
          <div class="dropdown mt-2 mb-2">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ selectedBrand.name || 'Выберите бренд' }}
            </a>
            <ul class="dropdown-menu">
              <li
                v-for="item in brands"
                :key="item.id"
                @click="setSelectedBrandHandler(item)"
              >
                <a class="dropdown-item" href="#">{{item.name}}</a>
              </li>
            </ul>
          </div>
          <input
            v-model="name"
            class="form-control mt-3"
            placeholder="Введите название устройства"
          >
          <input
            v-model.number="price"
            class="form-control mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          >
          <input
            class="form-control mt-3"
            type="file"
            @change="selectFile"
          >
          <hr>
          <button
            @click.stop="addInfo"
            class="btn btn-outline-dark"
          >
            Добавить новое свойство
          </button>
          <div
              class="row mt-4"
              v-for="item in info"
              :key="item.number"
          >
            <div class="col col-4">
              <input
                v-model="item.title"
                placeholder="Введите название характеристики"
                type="text"
                class="form-control"
                @change="changeInfo('title', item.title, item.number)"
              >
            </div>
            <div class="col col-4">
              <input
                v-model="item.description"
                placeholder="Введите описание свойства"
                type="text"
                class="form-control"
                @change="changeInfo('description', item.description, item.number)"
              >
            </div>
            <div class="col col-4">
              <button
                @click="removeInfo(item.number)"
                class="btn btn-outline-danger"
              >
                Удалить
              </button>
            </div>
          </div>
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
          @click="addDeviceHandler"
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
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import {createDevice, fetchBrands, fetchTypes} from "../../api/device";

export default {
  name: "createDeviceModal",
  props: {
    openCreateDeviceModal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const name = ref('');
    const price = ref(0);
    const file = ref(null);
    const selectedType = computed(() => store.getters.selectedType);
    const selectedBrand = computed(() => store.getters.selectedBrand);

    const store = useStore();
    const types = computed(() => store.getters.types);
    const brands = computed(() => store.getters.brands);
    const info = ref([])

    const changeInfo = (key, value, number) => {
      info.value = info.value.map((i) => {
        return i.number === number ? {...i, [key]: value} : i
      })
    }

    const addDeviceHandler = async () => {
      try {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('price', price.value)
        formData.append('img', file.value)
        formData.append('brandId', selectedBrand.value.id)
        formData.append('typeId', selectedType.value.id)
        formData.append('info', JSON.stringify(info.value))
        await createDevice(formData)
        closeModal()
      } catch (e) {
        alert(e.response.data.message)
      }
    }

    const addInfo = () => {
      info.value = [
        ...info.value,
        {
          title: '',
          description: '',
          number: Date.now()
        }
      ]
    }

    const selectFile = (e) => {
      file.value = e.target.files[0]
    }

    const removeInfo = (number) => {
      info.value = info.value.filter((i) => i.number !== number)
    }

    const closeModal = () => {
      emit('changeOpenCreateDeviceModal', false)
    }

    const setSelectedTypeHandler = (type) => {
      store.dispatch('setSelectedType', type)
    }

    const setSelectedBrandHandler = (brand) => {
      store.dispatch('setSelectedBrand', brand)
    }

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

    onMounted(() => {
      getTypes()
      getBrands()
    })

    return {
      closeModal,
      types,
      brands,
      addInfo,
      info,
      removeInfo,
      changeInfo,
      selectFile,
      name,
      price,
      setSelectedTypeHandler,
      setSelectedBrandHandler,
      selectedType,
      selectedBrand,
      addDeviceHandler
    }
  }
}
</script>

