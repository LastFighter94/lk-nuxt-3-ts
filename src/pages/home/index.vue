<template>
  <h1>Hello mock project</h1>

  <TestComponent />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import { testApi } from '~/entities/test-api';
import { TestComponent } from '~/pages/home/components';

onMounted(async () => {
  // const test = await testApi.testPoint(9842720298);
  // console.log(test);
  console.log('test');
});
</script>

<style lang="scss"></style>
