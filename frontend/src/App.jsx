import React from 'react'
import {Routes, Route} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import Home from './pages/Home'
import JournalsHome from './pages/JournalsHome'
import CreateJournal from './pages/CreateJournal'
import ShowJournal from './pages/ShowJournal'
import EditJournal from './pages/EditJournal'
import DeleteJournal from './pages/DeleteJournal'
import Profile from './pages/Profile'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import TeacherHome from './pages/TeacherHome'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

const App = () => {
  return (
    <Routes>

      <Route path = "/signup" element = {<Signup />} />
      <Route path = "/login" element = {<Login />} />

      <Route path = "/" element = {<WelcomePage />}/>

      <Route path = "/journals" element = { <ProtectedRoute allowedRoles={'user'}><Home /></ProtectedRoute>}/>
      
      <Route path = "/journals/list" element = {<JournalsHome />} />
      <Route path = "/journals/create" element = {<CreateJournal />} />
      <Route path = "/journals/details/:id" element = {<ShowJournal />} />
      <Route path = "/journals/edit/:id" element = {<EditJournal />} />
      <Route path = "/journals/delete/:id" element = {<DeleteJournal />} />

      <Route path = "/profile" element = {<Profile />} />

      <Route path = "/teachers" element = { <ProtectedRoute allowedRoles={'admin'}><TeacherHome/></ProtectedRoute> }/>
    </Routes>
  )
}

export default App