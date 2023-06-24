import { type FC, useState } from 'react'
import styles from '../../../global.module.scss'
import { type Group, type User } from '../../../types'

interface Props {
  group: Group
  users: Array<{ user: User; joined: boolean }>
  update: (groupId: number, userIds: number[]) => void
}

export const GroupRelation: FC<Props> = (props) => {
  const [joinedUserIds, setJoinedUserIds] = useState(
    props.users.filter(({ joined }) => joined).map(({ user }) => user.id)
  )

  return (
    <div className={styles.page}>
      <h2>Relation ( {props.group.name} )</h2>
      <div className={styles.content}>
        <div className={styles.field}>
          {props.users.map(({ user, joined }) => (
            <div key={user.id} className={styles.row}>
              <input
                id={`user-${user.id}`}
                type={'checkbox'}
                checked={joinedUserIds.includes(user.id)}
                onClick={() => {
                  let ids = [...joinedUserIds]
                  if (joinedUserIds.includes(user.id)) {
                    ids = ids.filter((id) => id !== user.id)
                  } else {
                    ids.push(user.id)
                  }
                  setJoinedUserIds(ids)
                }}
              />
              <label htmlFor={`user-${user.id}`}>{user.name}</label>
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
