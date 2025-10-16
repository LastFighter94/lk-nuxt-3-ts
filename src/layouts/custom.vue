<template>
  <div>
    <Header />
    <h1>custom header</h1>
    <slot />
    <h1>custom footer</h1>
  </div>
</template>

<script setup lang="ts">
import Header from '~/layouts/components/header.vue';
</script>

<style scoped lang="scss"></style>
