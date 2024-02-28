import React from 'react'
import {Routes, Route} from 'react-router-dom'
import RoleSelect from './pages/RoleSelect'
import Home from './pages/Home'
import JournalsHome from './pages/JournalsHome'
import CreateJournal from './pages/CreateJournal'
import ShowJournal from './pages/ShowJournal'
import EditJournal from './pages/EditJournal'
import DeleteJournal from './pages/DeleteJournal'

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<RoleSelect />}/>
      <Route path = "/journals" element = {<Home />}/>
      <Route path = "/journals/list" element = {<JournalsHome />} />
      <Route path = "/journals/create" element = {<CreateJournal />} />
      <Route path = "/journals/details/:id" element = {<ShowJournal />} />
      <Route path = "/journals/edit/:id" element = {<EditJournal />} />
      <Route path = "/journals/delete/:id" element = {<DeleteJournal />} />
    </Routes>
  )
}

export default App