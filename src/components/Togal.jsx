import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

// eslint-disable-next-line react/prop-types
export default function Togal({deleteTodo,Id}) {
  const [enabled, setEnabled] = useState(false)

  useEffect(()=>{
    setEnabled(false)
  },[deleteTodo])
  return (
    <div className=" mt-1">
      <Switch
        checked={enabled}
        onClick={()=>{
          if(!enabled){
            setTimeout(()=>{
              deleteTodo(Id)
            },20000)
          }
          setEnabled(!enabled)
        }}
        className={`${enabled ? 'bg-green-600' : 'bg-gray-700'}
          relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}