import * as types from '../../constant/mutationTypes';

const state = {
  selectedType: {},
  selectedBrand: {},
  types: [],
  brands: [],
  devices: [],
  page: 1,
  totalCount: 0,
  limit: 2
};
const getters = {
  types: (state) => state.types,
  devices: (state) => state.devices,
  brands: (state) => state.brands,
  selectedType: (state) => state.selectedType,
  selectedBrand: (state) => state.selectedBrand,
  limit: (state) => state.limit,
  totalCount: (state) => state.totalCount,
  page: (state) => state.page,
};
const mutations = {
  [types.SET_TYPES](state, { data }) {
    state.types = data;
  },
  [types.SET_DEVICES](state, { data }) {
    state.devices = data;
  },
  [types.SET_BRANDS](state, { data }) {
    state.brands = data;
  },
  [types.SET_SELECTED_TYPE](state, { data }) {
    state.page = 1
    state.selectedType = data;
  },
  [types.SET_SELECTED_BRAND](state, { data }) {
    state.page = 1
    state.selectedBrand = data;
  },
  [types.SET_LIMIT](state, { data }) {
    state.limit = data;
  },
  [types.SET_TOTAL_COUNT](state, { data }) {
    state.totalCount = data;
  },
  [types.SET_PAGE](state, { data }) {
    state.page = data;
  },
};
const actions = {
  setTypes({ commit }, data) {
    commit(types.SET_TYPES, { data });
  },
  setLimit({ commit }, data) {
    commit(types.SET_LIMIT, { data });
  },
  setTotalCount({ commit }, data) {
    commit(types.SET_TOTAL_COUNT, { data });
  },
  setPage({ commit }, data) {
    commit(types.SET_PAGE, { data });
  },
  setDevices({ commit }, data) {
    commit(types.SET_DEVICES, { data });
  },
  setBrands({ commit }, data) {
    commit(types.SET_BRANDS, { data });
  },
  setSelectedType({ commit }, data) {
    commit(types.SET_SELECTED_TYPE, { data });
  },
  setSelectedBrand({ commit }, data) {
    commit(types.SET_SELECTED_BRAND, { data });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
