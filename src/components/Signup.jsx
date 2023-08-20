import { AuthContext } from "../AuthContext/authContext";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Signup=()=>{
    const {signup}=useContext(AuthContext)
    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const {currentUser}=useContext(AuthContext)
    const navigate=useNavigate()
    return(
        currentUser ? <Navigate to={'/'}/>:
        <div className=" min-h-[100vh] grid place-items-center">
            <div className=" w-[400px] p-10 border shadow-lg rounded flex flex-col items-center">
            <h1 className=" text-3xl font-bold pb-1">Signup</h1>
                <ul className=" flex flex-col gap-2 w-full">
                    <li className=" flex flex-col">
                        <label className=" text-lg">Name</label> 
                        <input onChange={(e)=>{
                            setName(e.target.value)
                        }} placeholder="Name" className= "text-gray-400 border-gray-400 border rounded shadow-sm p-2 px-4" type="text"/>
                    </li>
                    <li className=" flex flex-col">
                            <label className=" text-lg">Username</label> 
                        <input onChange={(e)=>{
                            setUsername(e.target.value)
                        }}  placeholder="Username" className="text-gray-400 border-gray-400 border rounded shadow-sm p-2 px-4" type="email"/> 
                    </li>
                    <li className=" flex flex-col">
                            <label className=" text-lg">Password</label> 
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} type="Password" placeholder="password" className="text-gray-400 border-gray-400 border rounded shadow-sm p-2 px-4"/> 
                    </li>
                </ul>
               <button onClick={async()=>{
                    const newUser=await signup(name,username,password)
                    if(newUser){
                        navigate('/signin')
                    }
                }} type="submit" className="p-2 px-4 w-full font-semibold border border-blue-400 rounded shadow-sm bg-blue-400 text-white mt-3">SIGNUP</button>
                <button><a href="/signin" className="text-blue-500 underline">allready have an account?</a></button>

            </div>
        </div>
    )
}

export default Signup;