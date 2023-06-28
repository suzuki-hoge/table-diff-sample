import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { type Group } from '../types'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  type Create,
  type Delete,
  GroupList,
  type Update,
  type Relation,
} from '../component/group/list/GroupList'
import { Links } from '../component/Links'

export const GroupListPage: FC = () => {
  const [groups, setGroups] = useState<Group[]>([])

  const location = useLocation()

  useEffect(() => {
    invoke<Group[]>('group_all')
      .then((res) => {
        setGroups(res)
      })
      .catch(console.log)
  }, [location])

  const navigate = useNavigate()

  const create: Create = () => {
    navigate('/groups/create')
  }
  const update: Update = (id: number) => {
    navigate(`/groups/update/${id}`)
  }
  const remove: Delete = (id: number) => {
    invoke('group_delete', { id })
      .then(() => {
        navigate('/groups/all')
      })
      .catch(console.log)
  }
  const relation: Relation = (id: number) => {
    navigate(`/relation/${id}`)
  }

  return (
    <>
      <GroupList
        groups={groups}
        create={create}
        update={update}
        remove={remove}
        relation={relation}
      />
      <Links />
    </>
  )
}
