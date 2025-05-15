import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/UserAuth/Login'
import Signup from './components/UserAuth/Signup'
import SearchMovies from './components/SearchMovie/SearchMovies'
import Navbar from './components/Others/Nav'
import MovieDetails from './components/SearchMovie/MovieDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/search-movies' element={<SearchMovies />} />
      <Route path='/movie/:id' element={<MovieDetails/>} />
    </Routes>
    <div className="fixed bottom-4 right-4">
  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-4 shadow-lg">
    Tip Me!
  </button>
</div>
    </>
  )
}

export default App
