import type { Meta, StoryObj } from '@storybook/react'

import { UserList } from './UserList'

const meta = {
  title: 'User/List',
  component: UserList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof UserList>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {
    users: [
      { id: 1, name: 'John', optionCode: 'Admin' },
      { id: 2, name: 'Jane' },
    ],
  },
}
