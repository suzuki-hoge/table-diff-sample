import { type FC } from 'react'
import styles from '../../../global.module.scss'
import { type Group } from '../../../types'
import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { TbCirclesRelation } from 'react-icons/tb'

interface Props {
  groups: Group[]
  create: () => void
  update: (id: number) => void
  delete: (id: number) => void
  relation: (id: number) => void
}

export const GroupList: FC<Props> = (props) => {
  return (
    <div className={styles.page}>
      <h2>Group</h2>
      <div className={styles.content}>
        {props.groups.map((group) => (
          <div key={group.id} className={styles.field}>
            <span>{group.name}</span>
            <div className={styles.icons}>
              <TbCirclesRelation
                onClick={() => {
                  props.relation(group.id)
                }}
              />
              <BsPencil
                onClick={() => {
                  props.update(group.id)
                }}
              />
              <AiOutlineDelete
                onClick={() => {
                  props.delete(group.id)
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
