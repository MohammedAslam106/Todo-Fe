import { useContext } from "react";
import {AuthContext} from '../context/authContext'
// import Signin from "../src/components/signin";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute=()=>{
    const {currentUser}=useContext(AuthContext)
    // const temp='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaGFtbWVkYXNsYW1AZ21haWwuY29tIiwicGFzc3dvcmQiOiJBc2xhbTEwNiIsImlhdCI6MTY4NjQ2ODMwOH0.AXkjbIxHyTvgzDCZnXUUsooubddqfgcxcmzb7YkOh2A'
    return(
        currentUser? <Outlet/> : <Navigate to='/signin'/>
    )
}

export default ProtectedRoute;