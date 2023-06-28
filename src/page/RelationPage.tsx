import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  GroupRelation,
  type RelationGroup,
  type RelationUser,
  type Update,
} from '../component/group/relation/GroupRelation'
import { Links } from '../component/Links'

export const RelationPage: FC = () => {
  const [group, setGroup] = useState<RelationGroup | undefined>(undefined)
  const [users, setUsers] = useState<RelationUser[]>([])

  const { id } = useParams()
  const n = parseInt(id)

  const location = useLocation()

  useEffect(() => {
    invoke<{ group: RelationGroup; users: RelationUser[] }>('relation_find', {
      id: n,
    })
      .then((res) => {
        setGroup(res.group)
        setUsers(res.users)
      })
      .catch(console.log)
  }, [location])

  const navigate = useNavigate()

  const update: Update = (groupId: number, userIds: number[]) => {
    invoke('relation_update', { id: groupId, users: userIds })
      .then(() => {
        navigate('/groups/all')
      })
      .catch(console.log)
  }

  return group !== undefined ? (
    <>
      <GroupRelation group={group} users={users} update={update} />
      <Links />
    </>
  ) : (
    <></>
  )
}
