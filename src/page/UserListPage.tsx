import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { type User } from '../types'
import {
  type Create,
  type Update,
  UserList,
  type Delete,
} from '../component/user/list/UserList'
import { useLocation, useNavigate } from 'react-router-dom'
import { Links } from '../component/Links'

export const UserListPage: FC = () => {
  const [users, setUsers] = useState<User[]>([])

  const location = useLocation()

  useEffect(() => {
    invoke<User[]>('user_all')
      .then((res) => {
        setUsers(res)
      })
      .catch(console.log)
  }, [location])

  const navigate = useNavigate()

  const create: Create = () => {
    navigate('/users/create')
  }
  const update: Update = (id: number) => {
    navigate(`/users/update/${id}`)
  }
  const remove: Delete = (id: number) => {
    invoke('user_delete', { id })
      .then(() => {
        navigate('/users/all')
      })
      .catch(console.log)
  }

  return (
    <>
      <UserList users={users} create={create} update={update} remove={remove} />
      <Links />
    </>
  )
}
