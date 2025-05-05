import axios from "axios";
import { Children, createContext,useContext,useEffect,useState } from "react";


const UserContext = createContext()

export const UserProvider = ({children})=>{
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(false)

  const fetchUserData = async ()=>{
      try{
        const resp = await axios.get("http://localhost:5000/api/auth/profile",{
          withCredentials:true
        } 
        )
        console.log(resp)
      setUser(resp.data)
      
      }catch(err){
        console.error("Error fetching User",err)
        setUser(null)
      }finally{
        setLoading(false)
      }
  }
  useEffect(()=>{
    fetchUserData()
  },[])
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}


export const useUser = () => useContext(UserContext);