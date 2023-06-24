import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { type User } from '../types'
import { UserList } from '../component/user/list/UserList'
import { useLocation, useNavigate } from 'react-router-dom'

export const UserListPage: FC = () => {
  const [users, setUsers] = useState<User[]>([])

  const location = useLocation()

  useEffect(() => {
    invoke<User[]>('user_all').then((res) => {
      setUsers(res)
    })
  }, [location])

  const navigate = useNavigate()

  const create = () => { navigate('/users/create'); }
  const update = (id: number) => { navigate(`/users/update/${id}`); }
  const remove = (id: number) => {
    invoke('user_delete', { id }).then(() => {
      navigate('/users/all')
    })
  }

  return (
    <UserList users={users} create={create} update={update} delete={remove} />
  )
}
