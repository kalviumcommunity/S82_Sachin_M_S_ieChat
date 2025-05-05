import React from 'react'
import { useUser } from '../context/UserContext'

function Home() {
  const {user,loading} = useUser()
  console.log(user)
  if(loading) return (<p>Loading User..</p>)
  if(!user) return (
    <div>
      Login to see details
    </div>
  )
    return (
    <div>
      welcome {user.username}
    </div>
  )
}

export default Home
