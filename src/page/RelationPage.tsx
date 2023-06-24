import { type FC, useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { GroupRelation } from '../component/group/relation/GroupRelation'
import { type Group, type User } from '../types'

export const RelationPage: FC = () => {
  const [group, setGroup] = useState<Group | undefined>(undefined)
  const [users, setUsers] = useState<Array<{ user: User; joined: boolean }>>([])

  const { id } = useParams()
  const n = parseInt(id)

  const location = useLocation()

  useEffect(() => {
    invoke<{ group: Group; users: Array<{ user: User; joined: boolean }> }>(
      'relation_find',
      { id: n }
    ).then((res) => {
      setGroup(res.group)
      setUsers(res.users)
    })
  }, [location])

  const navigate = useNavigate()

  const update = (groupId: number, userIds: number[]) => {
    invoke('relation_update', { id: groupId, users: userIds }).then(() => {
      navigate('/groups/all')
    })
  }

  return group !== undefined ? (
    <GroupRelation group={group} users={users} update={update} />
  ) : (
    <></>
  )
}
