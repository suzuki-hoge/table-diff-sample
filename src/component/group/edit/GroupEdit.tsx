import { type FC, useState } from 'react'
import styles from '../../../global.module.scss'
import { type Group } from '../../../types'

interface Props {
  group?: Group
  store: (id: number | undefined, name: string) => void
}

export const GroupEdit: FC<Props> = (props) => {
  const [name, setName] = useState(props.group?.name ?? '')

  return (
    <div className={styles.page}>
      <h2>Group Input</h2>
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
      </div>
      <button
        onClick={() => {
          props.store(props.group?.id, name)
        }}
      >
        Save
      </button>
    </div>
  )
}
