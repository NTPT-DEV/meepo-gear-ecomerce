import { AlignJustify } from "lucide-react"
import Image from "next/image"

const ListCategory = () => {
  return (
    <div className="flex items-center justify-between bg-white px-10 py-3 hover:shadow-sm border-b border-gray-100 transition-all duration-200 hover:-translate-y-0.5 transform">
       {/* Image */}
        <div className="flex justify-center items-center bg-white w-[120px] aspect-square h-auto rounded-4xl drop-shadow-md">
           <Image className=""
           src={'/1024.png'} alt="" width={300} height={300} /> 
        </div>

        {/* Name & title */}

        <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-black truncate">Lorem ipsum dolor sit amet.</h2>
            <p className="text-sm text-gray-500 truncate">Lorem ipsum dolor sit amet.</p>
        </div>

        {/* Quantity */}
        <div className="flex justify-center items-center gap-2">
            <div className="font-semibold"> in stock :</div>
            <div className="flex justify-center items-center bg-white w-9 h-9 rounded-full shadow-sm border border-gray-100 text-black">
                <span className="text-sm font-bold">99</span>
            </div>
        </div>

        {/* Price */}

        <div className="flex justify-center items-center gap-2 text-xl font-bold text-black">
            <span>฿</span>
            <span>99999</span>
        </div>

        {/* menu */}
        <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
                <AlignJustify className="w-6 h-6 text-zinc-500" />
            </div>
            
        </div>

    </div>
  )
}
export default ListCategory