import { type FC } from 'react'
import styles from '../../../global.module.scss'
import { type User } from '../../../types'
import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

interface Props {
  users: User[]
  create: () => void
  update: (id: number) => void
  delete: (id: number) => void
}

export const UserList: FC<Props> = (props) => {
  return (
    <div className={styles.page}>
      <h2>Users</h2>
      <div className={styles.content}>
        {props.users.map((user) => (
          <div key={user.id} className={styles.field}>
            <span>{user.name}</span>
            <div className={styles.icons}>
              <BsPencil
                onClick={() => {
                  props.update(user.id)
                }}
              />
              <AiOutlineDelete
                onClick={() => {
                  props.delete(user.id)
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          props.create()
        }}
      >
        Add
      </button>
    </div>
  )
}
