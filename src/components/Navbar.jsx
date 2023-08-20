import { useContext, useState } from 'react'
import { TbHome, TbList} from 'react-icons/tb'
import { AuthContext } from '../AuthContext/authContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar(){
    const [showBar,setShowBar]=useState(false)
    const {signout}=useContext(AuthContext)
    const navigate=useNavigate()
    return (
        <>
            <div className=" fixed top-0 p-8 bg-blue-100 w-full">
                <div className=' flex justify-between items-center'>
                    <TbHome onClick={()=>navigate('/')} size={30} className=' cursor-pointer text-red-700'/>
                    <div onMouseLeave={()=>setShowBar(false)}  className=' relative'>
                        <TbList onMouseMove={()=>setShowBar(true)} size={30} className=' cursor-pointer text-red-700'/>
                        {showBar && <ul className=' absolute right-0 bg-white rounded shadow-sm px-3 py-2'>
                            <li>
                                <button onClick={signout} className='w-full'>Signout</button>
                            </li>
                        </ul>}
                    </div>
                </div>
            </div>
        </>
    )
}