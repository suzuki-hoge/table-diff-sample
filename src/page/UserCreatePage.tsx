import { type FC } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { UserEdit } from '../component/user/edit/UserEdit'
import { useNavigate } from 'react-router-dom'

export const UserCreatePage: FC = () => {
  const navigate = useNavigate()

  const store = (id: number | undefined, name: string, option: string) => {
    invoke('user_create', { name, option }).then(() => {
      navigate('/users/all')
    })
  }

  return <UserEdit store={store} />
}
