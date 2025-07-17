import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import NotFound from './pages/not-found'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App