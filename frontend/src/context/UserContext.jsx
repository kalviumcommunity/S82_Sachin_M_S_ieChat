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

      setUser(resp.data)
      
      }catch(err){
        console.error("Error fetching User",err)
        setUser(null)
      }finally{
        setLoading(false)
      }
  }
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", null, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  useEffect(()=>{
    fetchUserData()
  },[])
  return (
    <UserContext.Provider value={{ user, setUser, loading,logout }}>
      {children}
    </UserContext.Provider>
  );
}


export const useUser = () => useContext(UserContext);