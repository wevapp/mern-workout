import { Routes, Route } from 'react-router-dom'
import Rootlayout from './shared/components/Layout/Rootlayout'
import Home from './pages/Home'
import Edit from './components/Edit'

import './App.css'

const App = () => {
  return (
      <Routes>
        <Route element={<Rootlayout />}>
            <Route index element={<Home />}/>
            <Route path='/edit/:id' element={<Edit />}/>
        </Route>
      </Routes>
  )
}

export default App
