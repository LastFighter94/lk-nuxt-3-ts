<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// тут можно использовать middleWare на авторизацию

const route = useRoute();
const layoutName = ref<'default' | 'custom'>('default');

const cookieModal = ref(false);

onMounted(() => {
  cookieModal.value = !cookieModal.value;
});

watch(
  route,
  (value) => {
    // definePageMeta не отрабатывал - есть такой bug в nuxt 3.17, видимо связано с тем что посносили pages в router
    // или может быть с чем-то другим
    if (value.name === 'two') {
      layoutName.value = 'custom';
    } else {
      layoutName.value = 'default';
    }
  },
  { deep: true, immediate: true },
);
</script>
