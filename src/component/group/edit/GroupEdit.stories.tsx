import type { Meta, StoryObj } from '@storybook/react'

import { GroupEdit } from './GroupEdit'

const meta = {
  title: 'Group/Edit',
  component: GroupEdit,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GroupEdit>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {
  args: {
    store: console.log,
  },
}

export const Update: Story = {
  args: {
    group: {
      id: 1,
      name: 'Maintainers',
    },
    store: console.log,
  },
}
