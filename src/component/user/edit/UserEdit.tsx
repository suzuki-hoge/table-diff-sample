import { type FC, useState } from 'react'
import styles from '../../../global.module.scss'
import { type User } from '../../../types'

interface Props {
  user?: User
  store: (id: number | undefined, name: string, option: string) => void
}

export const UserEdit: FC<Props> = (props) => {
  const [name, setName] = useState(props.user?.name ?? '')
  const [option, setOption] = useState(props.user?.optionCode ?? '')

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
            value={option}
            size={64}
            maxLength={32}
            onChange={(e) => {
              setOption(e.target.value)
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          props.store(props.user?.id, name, option)
        }}
      >
        Save
      </button>
    </div>
  )
}
