import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/UserAuth/Login'
import Signup from './components/UserAuth/Signup'
import SearchMovies from './components/SearchMovie/SearchMovies'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='signup' element={<Signup/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='search-movies' element={<SearchMovies />} />
    </Routes>

    </>
  )
}

export default App
