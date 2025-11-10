<template>
  <h1>Hello mock project</h1>

  <img :src="authBg" alt="authBg" />

  <TestComponent />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import { testApi } from '~/entities/test-api';
import { TestComponent } from '~/pages/home/components';
import authBg from '@/assets/images/authPage/auth-bg.png';

onMounted(async () => {
  // const test = await testApi.testPoint(9842720298);
  // console.log(test);
  console.log('test');
});
</script>

<style lang="scss"></style>
