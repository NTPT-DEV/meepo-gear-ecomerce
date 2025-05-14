"use client";
import { AlignJustify, Trash2 } from "lucide-react";

const MenuBtnDashboard = () => {


  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center bg-lime-300 w-12 h-12 rounded-full relative group overflow-hidden ">
        <button
          // ref={refButtom}
          className="flex justify-center items-center cursor-pointer absolute left-0 group-hover:translate-x-[-50%] transitions-all duration-300 ease-in-out "
        >
          <div className="flex justify-center items-center bg-gray-100 w-12 h-12">
            <AlignJustify className="w-6 h-6 text-zinc-500" />
          </div>
          <div className="flex justify-center items-center bg-red-600  w-12 h-12">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};
export default MenuBtnDashboard;
