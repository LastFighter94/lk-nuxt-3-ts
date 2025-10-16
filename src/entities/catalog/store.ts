import { defineStore } from 'pinia';

interface IState {
  testStateValue: boolean;
}

export const useTestStore = defineStore('testStore', {
  state: (): IState => ({
    testStateValue: true,
  }),
  getters: {
    getTestStateValue: (state) => state.testStateValue,
  },
  actions: {
    setTestStateValue(testStateValue: boolean) {
      this.testStateValue = testStateValue;
    },
  },
});
