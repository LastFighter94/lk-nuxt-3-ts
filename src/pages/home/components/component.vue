<template>
  <div :class="b(true)">test component</div>
</template>

<script setup lang="ts">
import { useStyle } from '@/shared/lib/style';

const { b } = useStyle('test-component');
</script>

<style scoped lang="scss">
$block: 'test-component';

.#{$block} {
  background-color: red;
}
</style>
