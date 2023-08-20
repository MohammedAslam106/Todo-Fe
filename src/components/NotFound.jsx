import { useNavigate } from "react-router-dom"

export default function NotFound(){
    const navigate=useNavigate()
    return(
        <>
            <div className=" min-h-[100vh] w-full grid place-items-center">
                <div className=" p-5 px-3 shadow-sm rounded flex flex-col items-center">
                    <h1 className=" font-bold text-2xl">Oops!</h1>
                    <h1 className=" font-bold text-2xl">404 page not found</h1>
                    <p>Sorry the requested page does not exist</p>
                    <button onClick={()=>{
                        navigate(-1)
                    }} className=" p-3 px-4 bg-blue-400 rounded shadow-sm mt-3 text-white font-semibold">Go Back</button>
                </div>
            </div>
        </>
    )
}