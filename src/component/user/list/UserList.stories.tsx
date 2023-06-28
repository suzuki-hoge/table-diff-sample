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
      {
        id: 1,
        name: 'John',
        role: 'Admin',
        created: '2023-01-02 15:17:52',
        updated: '2023-01-02 15:17:52',
      },
      {
        id: 2,
        name: 'Jane',
        role: '',
        created: '2023-01-02 16:00:41',
        updated: '2023-01-05 09:23:13',
      },
    ],
  },
}
