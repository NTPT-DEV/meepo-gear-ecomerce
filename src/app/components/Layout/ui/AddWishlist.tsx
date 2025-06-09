"use client";
import { useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const AddWishList = () => {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <button
      onClick={handleClick}
      className="flex justify-center items-center bg-white rounded-full shadow-sm w-10 h-10 active:scale-90 transition-all duration-100 cursor-pointer"
    >
      {isClick ? (
        <IoHeartOutline className="w-6 h-6 text-red-600" />
      ) : (
        <IoHeartSharp className="w-6 h-6 text-red-600" />
      )}
    </button>
  );
};
export default AddWishList;
