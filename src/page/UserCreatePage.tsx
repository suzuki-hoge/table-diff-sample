import { type FC } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { type Store, UserEdit } from '../component/user/edit/UserEdit'
import { useNavigate } from 'react-router-dom'
import { Links } from '../component/Links'

export const UserCreatePage: FC = () => {
  const navigate = useNavigate()

  const store: Store = (id: number | undefined, name: string, role: string) => {
    invoke('user_create', { name, role })
      .then(() => {
        navigate('/users/all')
      })
      .catch(console.log)
  }

  return (
    <>
      <UserEdit store={store} />
      <Links />
    </>
  )
}
