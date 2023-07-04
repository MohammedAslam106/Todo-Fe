import {createContext, useEffect, useState} from 'react'

export const AuthContext=createContext()

const BASE_URL=import.meta.env.VITE_BASE_URL


// eslint-disable-next-line react/prop-types
export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState('')

    useEffect(()=>{
        console.log('its rendered')
        const newUser=localStorage.getItem('user')
        if(newUser){
            setCurrentUser((newUser))
        }
    },[])
    const signup=async(name,username,password)=>{
        console.log(`${BASE_URL}/api/auth/signup`)
        const response=await (await fetch(`${BASE_URL}/api/auth/signup`,{
            method:'POST',
            body:JSON.stringify({name:name,username:username,password:password}),
            headers:{
                "Content-Type":"application/json",
            },
        }))
        if(response.status===200){
            return true
        }else{
            return false
        }
    }
    const signin=async (username,password)=>{
        const response=await (await fetch(`${BASE_URL}/api/auth/signin`,{
            method:'POST',
           
            body:JSON.stringify({username:username,password:password}),
            headers:{
                "Content-Type":"application/json"
            }
        }))
        let jsonRes=await response.json()
        console.log((response))
        console.log(jsonRes)
        if(response.status===200){
            setCurrentUser(jsonRes.message)
            localStorage.setItem('user',(jsonRes.message))
            return true
        }
        else{
            return false
        }
    }
    const signout=()=>{
        console.log('logging out')
        localStorage.clear()
        location.reload()
    }
    return(
        <AuthContext.Provider value={{currentUser, signin, signup,signout}}>
            {children}
        </AuthContext.Provider>
    )
}




