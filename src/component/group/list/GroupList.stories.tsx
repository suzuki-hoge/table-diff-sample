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
      { id: 1, name: 'Maintainers' },
      { id: 2, name: 'Trials' },
    ],
  },
}
