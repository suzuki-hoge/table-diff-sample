import { type FC } from 'react'
import styles from '../../../global.module.scss'
import { type User } from '../../../types'
import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'

export type Create = () => void
export type Update = (id: number) => void
export type Delete = (id: number) => void

interface Props {
  users: User[]
  create: Create
  update: Update
  remove: Delete
}

export const UserList: FC<Props> = (props) => {
  return (
    <div className={styles.page}>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>role</th>
            <th>create</th>
            <th>update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.created}</td>
              <td>{user.updated}</td>
              <td>
                <BsPencil
                  onClick={() => {
                    props.update(user.id)
                  }}
                />
                <AiOutlineDelete
                  onClick={() => {
                    props.remove(user.id)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
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
        </tfoot>
      </table>
    </div>
  )
}
