import { type FC } from 'react'
import { Link } from 'react-router-dom'

export const Links: FC = () => {
  return (
    <ul>
      <li>
        <Link to={'/groups/all'}>Groups</Link>
      </li>
      <li>
        <Link to={'/users/all'}>Users</Link>
      </li>
    </ul>
  )
}
