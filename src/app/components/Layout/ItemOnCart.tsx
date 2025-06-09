import Image from "next/image";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { CartItem, useCartStore } from "@/store/cartStore";
import axios from "axios";

type TypeProps = {
  item: CartItem;
  index: number;
  handleRemoveCartItem : (cartItemId : string) => void
};

const ItemOnCart = ({ item, index , handleRemoveCartItem }: TypeProps ) => {

  const { updateCartItem } = useCartStore();

  const handleIncreaseQty = async () => {
    if(item.id) {
      try {  
        const response = await axios.patch(`/api/cart/${item.id}` , 
        { quantity: item.quantity + 1 }
        )

        const updatedItem = response.data.cartItem;
        
        updateCartItem(updatedItem);

      }catch(err){ 
        console.error("Failed to increase item quantity", err);
      }
    }
  };
  const handleDecreaseQty = async () => {
    if(item.id) {
      if(item.quantity <= 1)return
      try {  
        const response = await axios.patch(`/api/cart/${item.id}` , 
        { quantity: item.quantity - 1 }
        )

        const updatedItem = response.data.cartItem;
      
        updateCartItem(updatedItem);

      }catch(err){ 
        console.error("Failed to decrease item quantity", err);
      }
    }
  };


  return (
    <div
      key={index}
      className="flex w-full h-full items-center p-5 gap-4 rounded-3xl mx-auto bg-white
      max-[500px]:flex-col overflow-y-hidden relative"
    >
      <Image
        src={item.product?.images?.[0]?.secure_url}
        alt={item.product?.name}
        width={400}
        height={400}
        priority
        className="w-30 p-3 h-auto shadow-sm rounded-2xl"
      />
      <div
        className="flex w-full items-center justify-between
              max-[500px]:flex-col "
      >
        <div
          className="flex flex-col gap-2 
                max-[500px]:justify-center max-[500px]:text-center"
        >
          {/* Name */}
          <div
            className="font-bold text-md
                  max-[500px]:text-lg line-clamp-2"
          >
            {item.product?.name}
          </div>
          <div
            className="flex flex-col 
                  max-[500px]:flex-row max-[500px]:items-center max-[500px]:gap-2 max-[500px]:justify-center"
          >
            <h1 className="font-semibold text-sm text-gray-600 max-[500px]:text-lg">
              Price :
            </h1>
            <h2 className="font-bold text-zinc-900 text-lg max-[500px]:text-xl">
              {item.product?.price}
            </h2>
          </div>
        </div>
        {/* Quantity */}
        <div className="flex flex-col justify-between items-center gap-2 h-full my-2">
          <button 
            onClick={()=> {
            
            if (!item.id) {
             console.error("CartItem ID is undefined");
            return;
    }
            handleRemoveCartItem(item.id)
          }}
          >
            <Trash2 className="text-gray-500 hover:text-red-700 w-5 h-auto absolute right-5 top-4 transittion-text duration-300 cursor-pointer" />
          </button>
          <div className="flex gap-3">
            <CircleMinus 
            onClick={handleDecreaseQty}
            className="text-gray-500 hover:text-gray-900 w-5 h-auto transition-all duration-200" />
            <span className="font-bold text-xl border-2 border-gray-100 px-3 py-1 rounded-sm">
              {item.quantity}
            </span>
            <CirclePlus 
            onClick={handleIncreaseQty}
            className="text-gray-500 hover:text-gray-900 w-5 h-auto transition-all duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemOnCart;
