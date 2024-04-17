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
import TeacherCreateTask from './pages/TeacherCreateTask' 
import TeacherTaskHome from './pages/TeacherTaskHome'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import Goals from './pages/Goals'
import EditTask from './pages/EditTask'

const App = () => {
  return (
    <Routes>

      <Route path = "/signup" element = {<Signup />} />
      <Route path = "/login" element = {<Login />} />

      <Route path = "/" element = {<WelcomePage />}/>

      <Route path = "/journals" element = { <ProtectedRoute allowedRoles={'student'}><Home /></ProtectedRoute>}/>
      
      <Route path = "/journals/list" element = {<JournalsHome />} />
      <Route path = "/journals/create" element = {<CreateJournal />} />
      <Route path = "/journals/details/:id" element = {<ShowJournal />} />
      <Route path = "/journals/edit/:id" element = {<EditJournal />} />
      <Route path = "/journals/delete/:id" element = {<DeleteJournal />} />

      <Route path = "/profile" element = {<Profile />} />
      <Route path = "/goals" element = {<Goals />} />

      <Route path = "/teachers" element = { <ProtectedRoute allowedRoles={'teacher'}><TeacherHome/></ProtectedRoute> }/>
      <Route path = "/teachers/TeacherTaskHome" element = {<TeacherTaskHome />} />
      <Route path = "/teachers/TeacherCreateTask" element = {<TeacherCreateTask />} />
      <Route path = "/teachers/edit/:id" element = {<EditTask />} />
    </Routes>
  )
}

export default App