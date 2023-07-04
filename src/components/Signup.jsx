import { AuthContext } from "../AuthContext/authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const {signup}=useContext(AuthContext)
    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    return(
        <div className="grid items-center justify-center mt-16">
            <label htmlFor="name">Name:</label> 
            <input onChange={(e)=>{
                setName(e.target.value)
            }} placeholder="Type your name" className= "border-black border-2 rounded-md p-1" type="text"/> <br /> 
            <label htmlFor="username">username:</label> 
            <input onChange={(e)=>{
                setUsername(e.target.value)
            }}  placeholder="username" className="border-black border-2 rounded-md p-1" type="email"/> <br /> 
            <label htmlFor="password">Password:</label> 
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" placeholder="password" className="border-black border-2 rounded-md p-1"/> <br /> 
            <button onClick={async()=>{
                const newUser=await signup(name,username,password)
                if(newUser){
                    navigate('/signin')
                }
            }} type="submit" className="border-1 border-black rounded-md bg-blue-600 text-white ">signup</button>
            <button><a href="/signin" className="text-blue-500">allready have an account?</a></button>

        </div>
    )
}

export default Signup;