import type { Meta, StoryObj } from '@storybook/react';

import CustomFormField from './CustomFormField';

const meta = {
  component: CustomFormField,
} satisfies Meta<typeof CustomFormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    control: {},
    fieldType: {}
  }
};