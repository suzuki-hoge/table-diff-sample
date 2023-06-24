import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { UserEdit } from '../component/user/edit/UserEdit'
import { useNavigate, useParams } from 'react-router-dom'
import { type User } from '../types'

export const UserUpdatePage: FC = () => {
  const { id } = useParams()
  const n = parseInt(id)
  const navigate = useNavigate()

  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    invoke<User[]>('user_all').then((res) => {
      setUser(res.filter((user) => user.id === n)[0])
    })
  }, [])

  const store = (id: number | undefined, name: string, option: string) => {
    invoke('user_update', { id: n, name, option }).then(() => {
      navigate('/users/all')
    })
  }

  return user !== undefined ? <UserEdit user={user} store={store} /> : <></>
}
