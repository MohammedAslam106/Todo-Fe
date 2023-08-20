import { useEffect, useState } from 'react'
import { useContext } from 'react'


import Todo from './Todo'
import TodoModal from './TodoModal'
import { AuthContext } from '../AuthContext/authContext'
import Navbar from './Navbar'
import Footer from './Footer'


function Home() {
  // const Todos=[{title:'todo 1',description:"description 1",dueDate:'6/11/2023'},{title:'todo 2',description:"description 2",dueDate:'6/11/2023'},{title:'todo 3',description:"description 3",dueDate:'6/11/2023'}]
  const {currentUser}=useContext(AuthContext)
  const [todos,setTodos]=useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [countEdit,setCountEdit]=useState(0)
  const [search,setSearch]=useState('')
  const BASE_URL=import.meta.env.VITE_BASE_URL

  useEffect(()=>{
    const getData=async()=>{
       await fetch(`${BASE_URL}/api/todo`,{
        method:'GET',
        headers:{
          Authorization: `Bearer ${(currentUser)}`,
          'Content-Type':'application/json'
        }
      }).then(async(response)=>{
        if(response.status===200){
          let allTodos=await response.json()
          setTodos(allTodos.data.filter(todo=>{
            if(todo.title.includes(search)){
              return todo
            }
          }))
        }
        else{
          console.log(response.json())
        }
      }).catch((error)=>{
        console.log(error,30)
      })
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isOpen,countEdit,search])

  return (
    <>
    <Navbar/>
      <div className=' min-h-[100vh] mt-[90px] p-8 sm:p-2' >
        <div className='flex items-center justify-center m-4'>
          {/* <label htmlFor="search" className='px-5'>search</label> */}
          <input onChange={(e)=>{
            setSearch(e.target.value)
          }} placeholder='Search...' className='p-2 px-5 border border-gray-400 text-gray-500 w-1/2 rounded-full' type="text" name="search"  />
        </div>
        <div className="grid justify-center my-5">
        <button
          type="button"
          onClick={()=>setIsOpen(true)}
          className=" rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create Todo
        </button>
        
      </div>
        <TodoModal setIsOpen={setIsOpen} isOpen={isOpen}/>
        <div >
          {todos?.map((todo,ind)=>{
            // console.log(todo.dueDate,new Date().toISOString())
            
            return(<Todo  key={ind} todo={todo} setCountEdit={setCountEdit} />)
          })}
        </div>
      </div>
      <Footer/>
    </>
  
  )
}

export default Home;
