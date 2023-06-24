import { type FC } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { UserEdit } from '../component/user/edit/UserEdit'
import { useNavigate } from 'react-router-dom'
import { GroupEdit } from '../component/group/edit/GroupEdit'

export const GroupCreatePage: FC = () => {
  const navigate = useNavigate()

  const store = (id: number | undefined, name: string) => {
    invoke('group_create', { name }).then(() => {
      navigate('/groups/all')
    })
  }

  return <GroupEdit store={store} />
}
