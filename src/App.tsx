import { type FC } from 'react'
import './global.module.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserListPage } from './page/UserListPage'
import { TopPage } from './page/TopPage'
import { UserCreatePage } from './page/UserCreatePage'
import { UserUpdatePage } from './page/UserUpdatePage'
import { GroupListPage } from './page/GroupListPage'
import { GroupCreatePage } from './page/GroupCreatePage'
import { GroupUpdatePage } from './page/GroupUpdatePage'
import { RelationPage } from './page/RelationPage'

export const App: FC = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/groups/all" element={<GroupListPage />} />
          <Route path="/groups/create" element={<GroupCreatePage />} />
          <Route path="/groups/update/:id" element={<GroupUpdatePage />} />
          <Route path="/users/all" element={<UserListPage />} />
          <Route path="/users/create" element={<UserCreatePage />} />
          <Route path="/users/update/:id" element={<UserUpdatePage />} />
          <Route path="/relation/:id" element={<RelationPage />} />
        </Routes>
      </Router>
    </div>
  )
}
