import { defineStore } from 'pinia';
import { type IGlobalState } from '~/entities/stores/globStore/store-model.ts';

export const useGlobalStore = defineStore('globalStore', {
  state: (): IGlobalState => ({
    token: '',
  }),
  getters: {
    getTokenValue: (state) => state.token,
  },
  actions: {
    setTokenValue(testStateValue: string) {
      this.token = testStateValue;
    },
  },
  persist: true,
});
