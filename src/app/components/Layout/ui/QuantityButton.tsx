"use client";
import { useQuantityStore } from "@/store/cartStore";
import { CircleMinus, CirclePlus } from "lucide-react";


const QuantityButton = () => {
const itemCount = useQuantityStore((state) => state.itemCount);
const {increaseItemCount, decreaseItemCount  } = useQuantityStore();

  const increasement = () => {
    increaseItemCount();
    
  };

  const decreasement = () => {
    decreaseItemCount();
  };


  return (
    <div className="w-32 h-7 bg-gray-100 flex items-center justify-between px-2 rounded-full relative">
      <button
        onClick={decreasement}
      >
        <CircleMinus
          className="w-5 h-5 text-zinc-700"
        />
      </button>
      <span className="flex justify-center items-center font-semibold leading-[-10] text-xl bg-white w-10 h-10 rounded-full shadow-sm font-[Outfit]">
        {itemCount}
      </span>
      <button
        onClick={increasement}>
        <CirclePlus
          className="w-5 h-5 text-zinc-700"
        />
      </button>
    </div>
  );
};
export default QuantityButton;
