<template>
  <div class="svg-icon-wrapper" v-bind="attrs">
    <component :is="component" v-if="component" v-bind="componentProps" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { SvgIcons } from '~/shared/ui/svg/model.ts';

const props = defineProps({
  name: {
    type: String as PropType<keyof typeof SvgIcons>,
    required: true,
  },
  width: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
});

const component = computed(() => {
  if (props.name && props.name in SvgIcons) {
    return SvgIcons[props.name];
  }
  return null;
});

const componentProps = computed(() => {
  const p: Record<string, string> = {
    name: `svg-icon-${props.name}`,
  };
  if (props.width) p.width = props.width;
  if (props.height) p.height = props.height;
  return p;
});

const attrs = computed(() => {
  const attrs: Record<string, string> = {};
  if (props.width && props.height) {
    attrs.style = `width: ${props.width}px; height: ${props.height}px;`;
  }
  return attrs;
});
</script>

<style>
.svg-icon-wrapper {
  display: inline-block;
  width: fit-content;
  height: fit-content;
  line-height: 0;
  padding: 0;
  margin: 0;
}
</style>
