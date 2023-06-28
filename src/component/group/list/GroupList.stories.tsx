import type { Meta, StoryObj } from '@storybook/react'

import { GroupList } from './GroupList'

const meta = {
  title: 'Group/List',
  component: GroupList,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GroupList>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {
    groups: [
      {
        id: 1,
        name: 'Maintainers',
        created: '2023-01-01 08:53:00',
        updated: '2023-01-01 08:53:00',
      },
      {
        id: 2,
        name: 'Trials',
        created: '2023-01-01 09:02:33',
        updated: '2023-01-02 17:00:04',
      },
    ],
  },
}
