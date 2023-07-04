
import { Dialog, Transition } from '@headlessui/react'
import { Fragment,  useEffect,  useState } from 'react'
import { AuthContext } from '../AuthContext/authContext'
import { useContext } from 'react'

// eslint-disable-next-line react/prop-types
export default function TodoModal({editTodo=null,setIsOpen,isOpen,setCountEdit=null}) {
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [dueDate,setDueDate]=useState('')
  const {currentUser}=useContext(AuthContext)
  const BASE_URL=import.meta.env.VITE_BASE_URL


    useEffect(()=>{
      setTitle(editTodo?.title)
      setDescription(editTodo?.description)
      setDueDate(editTodo?.dueDate?.slice(0,10))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const createTodo=async()=>{
        if(editTodo){
          const updateTodo=await (await fetch(`${BASE_URL}/api/todo/${editTodo._id}`,{
            method:'PATCH',
            body:JSON.stringify({
              title:title,
              dueDate:dueDate,
              description:description
            }),
            headers:{
              Authorization:`Bearer ${(currentUser)}`,
              'Content-Type':'application/json'
            }
          }))
          if(updateTodo.status===200){
            setIsOpen(false)
            // window.location='/'
            setCountEdit(prev=>prev+1)
            return true
          }
          else{
            return false
          }
        }else{
        const newTodo=await (await fetch(`${BASE_URL}/api/todo`,{
            method:'POST',
            body:JSON.stringify({
                title:title,
                dueDate:dueDate,
                description:description,
            }),
            headers:{
                Authorization: `Bearer ${(currentUser)}`,
                'Content-Type':'application/json'
            }
        }))
        console.log(newTodo)
        if(newTodo.status===200){
            setIsOpen(false)
            return true
        }else{
            return false
        }
      }
    }



  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Create Your Todo
                  </Dialog.Title>
                  <div className="mt-2">
                    <label htmlFor="title" >Title</label><br />
                    <input value={title} placeholder='Title' className=' w-80 p-1 rounded-md border-2 border-black xl:w-96' type="text" name="title" onChange={(e)=>{
                        setTitle(e.target.value)
                    }} />
                    <br /> <br />
                    <label htmlFor="title" >Description</label><br />
                    <textarea value={description} placeholder='Description' className=' w-80 p-1 rounded-md border-2 border-black xl:w-96' type="text" name="title" onChange={(e)=>{
                        setDescription(e.target.value)
                    }}/> <br /> <br />
                    <label htmlFor="date">Due Date</label> <br />
                    <input value={dueDate} onChange={(e)=>{
                        setDueDate(e.target.value)
                    }} type="date" name="date" className='w-80 p-1 rounded-md border-2 border-black xl:w-96'/>
                  </div>

                  <div className="mt-4 gap-2">
                        <button
                        type="button"
                        className=" me-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={()=>setIsOpen(false)}
                        >
                        close
                        </button>
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={()=>{
                            createTodo()
                           
                        }}
                        >
                        save
                        </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


