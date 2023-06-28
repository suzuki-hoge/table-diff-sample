import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { useNavigate, useParams } from 'react-router-dom'
import { type Group, type User } from '../types'
import { GroupEdit, type Store } from '../component/group/edit/GroupEdit'
import { Links } from '../component/Links'

export const GroupUpdatePage: FC = () => {
  const { id } = useParams()
  const n = parseInt(id)
  const navigate = useNavigate()

  const [group, setGroup] = useState<Group | undefined>(undefined)

  useEffect(() => {
    invoke<User[]>('group_all')
      .then((res) => {
        setGroup(res.filter((user) => user.id === n)[0])
      })
      .catch(console.log)
  }, [])

  const store: Store = (id: number | undefined, name: string) => {
    invoke('group_update', { id: n, name })
      .then(() => {
        navigate('/groups/all')
      })
      .catch(console.log)
  }

  return group !== undefined ? (
    <>
      <GroupEdit group={group} store={store} />
      <Links />
    </>
  ) : (
    <></>
  )
}
