import { type FC, useState } from 'react'
import styles from '../../../global.module.scss'
import { type User } from '../../../types'

export type Store = (id: number | undefined, name: string, role: string) => void

interface Props {
  user?: User
  store: Store
}

export const UserEdit: FC<Props> = (props) => {
  const [name, setName] = useState(props.user?.name ?? '')
  const [role, setRole] = useState(props.user?.role ?? '')

  return (
    <div className={styles.page}>
      <h2>User Input</h2>
      <div className={styles.content}>
        <div className={styles.field}>
          <span>Name ( required )</span>
          <input
            type={'text'}
            value={name}
            size={64}
            maxLength={32}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className={styles.field}>
          <span>Option</span>
          <input
            type={'text'}
            value={role}
            size={64}
            maxLength={32}
            onChange={(e) => {
              setRole(e.target.value)
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          props.store(props.user?.id, name, role)
        }}
      >
        Save
      </button>
    </div>
  )
}
