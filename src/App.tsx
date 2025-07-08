import { Routes, Route } from 'react-router-dom'

import './App.css'

import NotesPage from './pages/notes'
import SettingsPage from './pages/settings'
import Layout from './components/layout'

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<NotesPage/>} />
        <Route path='/settings' element={<SettingsPage/>} />
      </Route>
    </Routes>
  )
}

export default App
