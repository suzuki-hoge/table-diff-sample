import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { type Store, UserEdit } from '../component/user/edit/UserEdit'
import { useNavigate, useParams } from 'react-router-dom'
import { type User } from '../types'
import { Links } from '../component/Links'

export const UserUpdatePage: FC = () => {
  const { id } = useParams()
  const n = parseInt(id)
  const navigate = useNavigate()

  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    invoke<User[]>('user_all')
      .then((res) => {
        setUser(res.filter((user) => user.id === n)[0])
      })
      .catch(console.log)
  }, [])

  const store: Store = (id: number | undefined, name: string, role: string) => {
    invoke('user_update', { id: n, name, role })
      .then(() => {
        navigate('/users/all')
      })
      .catch(console.log)
  }

  return user !== undefined ? (
    <>
      <UserEdit user={user} store={store} />
      <Links />
    </>
  ) : (
    <></>
  )
}
