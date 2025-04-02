import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    
    const backendUrl=import.meta.env.VITE_BACKEND_URL
   // console.log(backendUrl)

    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData,setUserData]=useState(false)
    const [history, setHistory] = useState([]);
    const [xmlData, setXmlData] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const loadUserProfileData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchHistory = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:4000/api/user/get-profile", {
            headers: { token },
          });
    
          if (response.data.success && response.data.userData.history) {
            setHistory(response.data.userData.history);
          }
        } catch (error) {
          console.error("Error fetching history:", error);
        }
      };


    const value={
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData,
        history,setHistory,
        fetchHistory,
        xmlData,setXmlData,
        pdfUrl,setPdfUrl
      }

 

    useEffect(() => {
        if (token) {
            loadUserProfileData();
            fetchHistory();
        } else {
            setUserData(false);
            setHistory([]);
        }
    }, [token]);

    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider