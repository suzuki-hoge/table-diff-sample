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
      { user: { id: 1, name: 'John' }, joined: true },
      { user: { id: 2, name: 'Jane' }, joined: false },
      { user: { id: 3, name: 'Jack' }, joined: true },
    ],
    join: console.log,
    remove: console.log,
  },
}
