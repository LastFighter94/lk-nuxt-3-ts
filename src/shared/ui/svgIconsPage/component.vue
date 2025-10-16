<template>
  <div :class="b(true)">
    <div v-for="(value, key) in SvgIcons" :key="key">
      <SvgIcon :name="key" /> {{ key }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStyle } from '~/shared/lib/style.ts';
import { SvgIcon } from '~/shared/ui/svg';
import { SvgIcons } from '~/shared/ui/svg/model.ts';

const { b } = useStyle('ui-notification');
</script>

<style lang="scss" scoped>
$block: ui-notification;

.#{$block} {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px;
}
</style>
