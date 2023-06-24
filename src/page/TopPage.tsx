import { type FC } from 'react'
import { Link } from 'react-router-dom'

export const TopPage: FC = () => {
  return (
    <ul>
      <li>
        <li>
          <Link to={'/groups/all'}>Groups</Link>
        </li>
        <li>
          <Link to={'/users/all'}>Users</Link>
        </li>
      </li>
    </ul>
  )
}
