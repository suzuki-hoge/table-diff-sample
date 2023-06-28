import type { Meta, StoryObj } from '@storybook/react'

import { GroupRelation } from './GroupRelation'

const meta = {
  title: 'Group/Relation',
  component: GroupRelation,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof GroupRelation>

export default meta
type Story = StoryObj<typeof meta>

export const Component: Story = {
  args: {
    group: { id: 1, name: 'Maintainers' },
    users: [
      { id: 1, name: 'John', role: 'Leader', joined: true },
      { id: 2, name: 'Jane', role: '', joined: false },
      { id: 3, name: 'Jack', role: '', joined: true },
    ],
    update: console.log,
  },
}
