import type { Meta, StoryObj } from '@storybook/react'

import { UserEdit } from './UserEdit'

const meta = {
  title: 'User/Edit',
  component: UserEdit,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserEdit>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {
  args: {
    store: console.log,
  },
}

export const Update: Story = {
  args: {
    user: {
      id: 1,
      name: 'John',
      role: 'Admin',
      created: '2023-01-02 15:17:52',
      updated: '2023-01-02 15:17:52',
    },
    store: console.log,
  },
}
