'use client'
import { CircleMinus, CirclePlus } from "lucide-react"
import { useState } from "react"

const QuantityButton = () => {
    const [ count, setCount ] = useState(0)

    const handleMinus = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const handlePlus = () => {
        setCount(count + 1)
    }

    
  return (
    <div className="w-32 h-7 bg-gray-100 flex items-center justify-between px-2 rounded-full relative">
              <button><CircleMinus onClick={handleMinus} className="w-5 h-5 text-zinc-700"/></button>
              <span className="flex justify-center items-center font-semibold leading-[-10] text-xl bg-white w-10 h-10 rounded-full shadow-sm font-[Outfit]">{count}</span>
              <button><CirclePlus onClick={handlePlus} className="w-5 h-5 text-zinc-700"/></button>
            </div>
  )
}
export default QuantityButton