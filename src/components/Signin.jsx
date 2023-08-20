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
        <div className=" min-h-[100vh] w-full grid place-items-center">
        <div className=" w-[400px] flex flex-col justify-center items-center border p-10 rounded shadow-lg">
            <h1 className=" text-3xl font-bold">Signin</h1>
            <ul className=" w-full">
                <li className="flex flex-col py-1">
                    <label className=" text-lg" >Username</label>
                    <input type="email" placeholder="username" className="text-gray-400 border-gray-400 border rounded shadow-sm p-2 px-4" onChange={(e)=>setUsername(e.target.value)} /> 
                </li>
                <li className="flex flex-col py-1">
                    <label className=" text-lg">Password</label> 
                    <input type="password" placeholder="password" className="border-gray-400 text-gray-400 border rounded shadow-sm p-2 px-4" onChange={(e)=>setPassword(e.target.value)}/>  
                </li>
            </ul>
            <button type="submit" className="p-2 w-full px-4 font-semibold border border-blue-400 rounded shadow-sm bg-blue-400 text-white mt-3" onClick={async()=>{
                const newUser= await signin(username,password)
                if(newUser){
                    navigate('/')
                }
            }}>SIGNIN</button>
            <button><a href="/signup" className="text-blue-500 underline">new user? register</a></button>
        </div>
        </div>
    )
}

export default Signin;