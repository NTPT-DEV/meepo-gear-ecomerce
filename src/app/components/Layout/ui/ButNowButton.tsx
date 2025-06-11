import { useMenuCartStore } from "@/store/menuCart";

const BuyNowButton = () => {
  const manualMenuCart = useMenuCartStore((state) => state.manualMenuCart);

  const handleBuyNow = () => { 
     alert('กดเพิ่มสินค้าลงตะกร้า')
      manualMenuCart()
  }

  return (
    <div
    onClick={handleBuyNow}
      className="mt-2 bg-black flex justify-center items-center w-full h-12
     rounded-xl cursor-pointer active:scale-95 transition-all duration-100 gap-2"
    >
      <span className="text-white text-lg font-semibold">Buy Now</span>
     
    </div>
  );
};
export default BuyNowButton;
