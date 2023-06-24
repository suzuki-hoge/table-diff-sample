import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { type Group, type User } from '../types'
import { UserList } from '../component/user/list/UserList'
import { useLocation, useNavigate } from 'react-router-dom'
import { GroupList } from '../component/group/list/GroupList'

export const GroupListPage: FC = () => {
  const [groups, setGroups] = useState<Group[]>([])

  const location = useLocation()

  useEffect(() => {
    invoke<Group[]>('group_all').then((res) => {
      setGroups(res)
    })
  }, [location])

  const navigate = useNavigate()

  const create = () => { navigate('/groups/create'); }
  const update = (id: number) => { navigate(`/groups/update/${id}`); }
  const remove = (id: number) => {
    invoke('group_delete', { id }).then(() => {
      navigate('/groups/all')
    })
  }
  const relation = (id: number) => { navigate(`/relation/${id}`); }

  return (
    <GroupList
      groups={groups}
      create={create}
      update={update}
      delete={remove}
      relation={relation}
    />
  )
}
