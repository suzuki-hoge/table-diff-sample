import { type FC } from 'react'
import styles from '../../../global.module.scss'
import { type Group } from '../../../types'
import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'
import { TbCirclesRelation } from 'react-icons/tb'

export type Create = () => void
export type Update = (id: number) => void
export type Delete = (id: number) => void
export type Relation = (id: number) => void

interface Props {
  groups: Group[]
  create: Create
  update: Update
  remove: Delete
  relation: Relation
}

export const GroupList: FC<Props> = (props) => {
  return (
    <div className={styles.page}>
      <h2>Groups</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>create</th>
            <th>update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.created}</td>
              <td>{group.updated}</td>
              <td>
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
                    props.remove(group.id)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <AiOutlinePlusCircle
                onClick={() => {
                  props.create()
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
