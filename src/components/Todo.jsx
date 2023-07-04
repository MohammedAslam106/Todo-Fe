/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import TodoModal from "./TodoModal";
import Togal from "./Togal";
import { AuthContext } from "../AuthContext/authContext";


const Todo=({todo,setCountEdit})=>{
    const [isOpen,setIsOpen]=useState(false)
    const {currentUser}=useContext(AuthContext)
    const BASE_URL=import.meta.env.VITE_BASE_URL

    
    const deleteTodo= async(id)=>{
        await (await fetch(`${BASE_URL}/api/todo/${id}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${(currentUser)}`,
                'Content-Type':'application/json'
            }
        }).then(res=>{
            console.log(res.json())
            setCountEdit(prev=>prev+1)
            // window.location='/'
        }).catch(error=>{
            console.log(error)
        }))
    }

    
    return(
        <div className={`py-5 flex items-center justify-between mb-5 border-2 rounded-xl ${(todo.dueDate.slice(0,10) < new Date().toISOString().slice(0,10)) && ' bg-red-100'} mx-1`}>
            <h1 className=" mx-7">{todo.title}</h1>
            <div className="flex items-center gap-5 mx-7">
                <h3 className=''>Due on: {todo.dueDate?.slice(0,10).split("-").reverse().join("-")}</h3>
                <button type="button" className="bg-gray-600 text-white p-1 border-black border-1 rounded-md w-12 hover:bg-gray-500" 
                    onClick={()=>{
                        setIsOpen(true)
                    }}
                >edit</button>
                <button onClick={()=>{
                    deleteTodo(todo._id)
                }} type="button" className="bg-red-500 text-white p-1 border-black border-1 rounded-md w-14 hover:bg-red-300">delete</button>
                <span><Togal deleteTodo={deleteTodo} Id={todo._id}/></span>
            </div>
            <TodoModal editTodo={todo} setIsOpen={setIsOpen} isOpen={isOpen} setCountEdit={setCountEdit}/>
        </div>
    )
}

export default Todo;