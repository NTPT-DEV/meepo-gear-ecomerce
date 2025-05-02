import { IoMdCart } from "react-icons/io";

const ButtonAddToCart = () => {
  return (
    <div
      className="mt-2 bg-[#9AE600] flex justify-center items-center w-full h-12
     rounded-xl cursor-pointer active:scale-95 transition-all duration-100 gap-2"
    >
      <span className=" text-lg">เพิ่มลงตะกร้า</span>
      <IoMdCart className="w-5 h-5 text-black" />
    </div>
  );
};
export default ButtonAddToCart;
