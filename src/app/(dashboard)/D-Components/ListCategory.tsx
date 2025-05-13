import { AlignJustify } from "lucide-react";
import Image from "next/image";

const ListCategory = () => {
  return (
    <div className="grid grid-cols-4 w-full h-auto gap-5 items-center bg-white  py-3 hover:shadow-sm border-b border-gray-100 transition-all duration-200 hover:-translate-y-0.5 transform">
      {/* Image */}
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center bg-white w-[120px] aspect-square h-auto rounded-4xl drop-shadow-md">
        <Image className="" src={"/1024.png"} alt="" width={300} height={300} />
        </div>
      </div>

      {/* Name & title */}

      <div className="flex justify-center items-center">
        <div className="flex flex-col items-start gap-1">
          <p className="text-sm text-gray-500 truncate">categories :</p>
          <h2 className="text-xl font-bold text-black truncate">Notebook Gaming</h2>
        </div>
      </div>

      {/* Product quantity in category */}
      <div className="flex justify-center items-center gap-4">
        <div className="font-semibold"> Product in stock :</div>
        <div className="flex justify-center items-center bg-white w-9 h-9 rounded-full shadow-sm border border-gray-100 text-black">
          <span className="text-sm font-bold line-clamp-6">99</span>
        </div>
      </div>

      {/* menu edit & delete */}
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
          <AlignJustify className="w-6 h-6 text-zinc-500" />
        </div>
      </div>
    </div>
  );
};
export default ListCategory;
