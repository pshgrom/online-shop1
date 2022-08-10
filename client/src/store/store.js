import { createStore } from 'vuex';
import user from './user/user'
import device from './device/device'

export default createStore({
  modules: {
    user,
    device
  }
});
