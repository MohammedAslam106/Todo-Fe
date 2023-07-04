import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/authContext";
import { Navigate, useNavigate } from "react-router-dom";
const Signin=()=>{
    const {signin}=useContext(AuthContext)
    const navigate=useNavigate()
    const {currentUser}=useContext(AuthContext)
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    return(
        currentUser ? <Navigate to='/'/> : 
        <div className=" grid items-center justify-center mt-16">
            <label htmlFor="username">username:</label>
            <input type="email" placeholder="username" className="border-black border-2 rounded-md p-1" onChange={(e)=>setUsername(e.target.value)} />  <br />
            <label htmlFor="password">Password:</label> 
            <input type="password" placeholder="password" className="border-black border-2 rounded-md p-1" onChange={(e)=>setPassword(e.target.value)}/>  <br />
            <button type="submit" className="border-1 border-black rounded-md bg-blue-600 text-white" onClick={async()=>{
                const newUser= await signin(username,password)
                if(newUser){
                    navigate('/')
                }
            }}>signin</button>
            <button><a href="/signup" className="text-blue-500">new user? register</a></button>
        </div>
    )
}

export default Signin;