import React from 'react'
import {useAuth} from "../context/UserContext"

function Home() {
  const {user} = useAuth()
  console.log(user)
  return (
    <div>
      
    </div>
  )
}

export default Home
