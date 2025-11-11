<template>
  <h1>Hello mock project</h1>

  <p @click="register">register</p>

  <TestComponent />

  <input v-model="code" type="number" />

  {{ code }}

  <p @click="confirm">confirm</p>

  <p @click="testRequestAfterAuth">testRequestAfterAuth</p>

  <img :src="authBg" alt="authBg" />
</template>

<script setup lang="ts">
import { registrationApi } from '~/entities/registration';
import { TestComponent } from '~/pages/home/components';
import authBg from '@/assets/images/authPage/auth-bg.png';
import { useGlobalStore } from '~/entities/stores/globStore/store.ts';
import { userApi } from '~/entities/user';

const globalStore = useGlobalStore();

const code = ref<number>(0);

const register = async () => {
  await registrationApi.registerUser(9842720298);
};

const confirm = async () => {
  const test = await registrationApi.confirmationUser({
    code: String(code.value),
    phone: (process.env.phonecode ?? '7') + 9842720298,
  });

  globalStore.setTokenValue(test?.token ?? '');
};

const testRequestAfterAuth = async () => {
  const userInfo = await userApi.getUserInfo();
  console.log(userInfo);
};
</script>

<style lang="scss"></style>
