import { type FC, useState } from 'react'
import styles from '../../../global.module.scss'

export type Update = (groupId: number, userIds: number[]) => void

export interface RelationGroup {
  id: number
  name: string
}

export interface RelationUser {
  id: number
  name: string
  role: string
  joined: boolean
}

interface Props {
  group: RelationGroup
  users: RelationUser[]
  update: Update
}

export const GroupRelation: FC<Props> = (props) => {
  const [joinedUserIds, setJoinedUserIds] = useState(
    props.users.filter(({ joined }) => joined).map(({ id }) => id)
  )

  return (
    <div className={styles.page}>
      <h2>Relation ( {props.group.name} )</h2>
      <div className={styles.content}>
        <div className={styles.field}>
          {props.users.map(({ id, name, role }) => (
            <div key={id} className={styles.row}>
              <input
                id={`user-${id}`}
                type={'checkbox'}
                checked={joinedUserIds.includes(id)}
                onClick={() => {
                  let ids = [...joinedUserIds]
                  if (joinedUserIds.includes(id)) {
                    ids = ids.filter((n) => n !== id)
                  } else {
                    ids.push(id)
                  }
                  setJoinedUserIds(ids)
                }}
              />
              <label htmlFor={`user-${id}`}>
                {role !== '' ? `${name} ( ${role} )` : `${name}`}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          props.update(props.group.id, joinedUserIds)
        }}
      >
        Save
      </button>
    </div>
  )
}
