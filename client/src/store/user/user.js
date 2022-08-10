import * as types from '../../constant/mutationTypes';
import router from "../../router";

const state = {
  currentUser: {},
  isAuth: false,
};
const getters = {
  isAuth: (state) => state.isAuth,
};
const mutations = {
  [types.SET_CURRENT_USER](state, { data }) {
    state.currentUser = data;
  },
  [types.SET_AUTH](state, { data }) {
    state.isAuth = data
  },
  [types.LOGOUT](state) {
    state.currentUser = {};
    state.isAuth = false
    localStorage.removeItem('token')
    router.push('/login').then(r => r)
  }
};
const actions = {
  setCurrentUser({ commit }, data) {
    commit(types.SET_CURRENT_USER, { data });
  },
  setAuth({ commit }, data) {
    commit(types.SET_AUTH, { data });
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
