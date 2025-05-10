"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const BtnProductCard = () => {

const {data : session} = useSession();
console.log(session);

const handleAddToCard = () => {
    if(session) {
        console.log('ISCLICK');
        
    } else {
        alert('Please login first !!')
        redirect('/auth/sign-in');
    }
    }


  return (
    <div className="w-full">
      <button 
      onClick={handleAddToCard}
      className="bg-black text-white text-md w-full py-2 rounded-full active:scale-[98%] transition-all duration-200 cursor-pointer hover:bg-[#9AE600] hover:text-black ">
        ใส่ตะกร้า
      </button>
    </div>
  );
};
export default BtnProductCard;
