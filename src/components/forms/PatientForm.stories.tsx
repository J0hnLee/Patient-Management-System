import type { Meta, StoryObj } from '@storybook/react';

import PatientForm from './PatientForm';

const meta = {
  component: PatientForm,
} satisfies Meta<typeof PatientForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};