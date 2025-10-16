import type { Meta, StoryFn } from '@storybook/vue3';
import SvgIconsPage from './component.vue';

export default {
  title: 'UI / Svg / SvgIconsPage',
  component: SvgIconsPage,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SvgIconsPage>;

const Template: StoryFn<typeof SvgIconsPage> = (args) => ({
  components: { SvgIconsPage },
  setup() {
    return {
      args,
    };
  },
  template: '<SvgIconsPage v-bind="args" />',
});

export const Default = Template;

export const SvgIconsPageTest = Template.bind({});
SvgIconsPageTest.args = {};
