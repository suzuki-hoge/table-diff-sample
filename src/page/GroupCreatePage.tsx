import { type FC } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { useNavigate } from 'react-router-dom'
import { GroupEdit, type Store } from '../component/group/edit/GroupEdit'
import { Links } from '../component/Links'

export const GroupCreatePage: FC = () => {
  const navigate = useNavigate()

  const store: Store = (id: number | undefined, name: string) => {
    invoke('group_create', { name })
      .then(() => {
        navigate('/groups/all')
      })
      .catch(console.log)
  }

  return (
    <>
      <GroupEdit store={store} />
      <Links />
    </>
  )
}
