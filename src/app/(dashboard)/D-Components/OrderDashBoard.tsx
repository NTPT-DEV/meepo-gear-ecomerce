import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { formatDateTime } from "@/lib/utils";

interface TypeOrderPros { 
  id  : string; 
  cartTotalPrice : number 
  orderStatus : string 
  updateAt : string 
  products : {
    name : string 
    price : number 
    quantity : number 
  }[]
  user : { 
    id : string 
    name : string
    email : string 
  }
}

export const varliantsUsers = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

const OrderDashBoard = () => {
  const [orders, setOrders] = useState<TypeOrderPros[] | null>(null);

  console.log(orders);

  // get Order List
  useEffect(() => {
    const getOrderList = async () => {
      try {
        const res = await axios.get("/api/order");
        const ordersItem = await res.data.orderList;
        setOrders(ordersItem);
      } catch (err) {
        console.log(err, "Error to get all users");
      }
    };
    getOrderList();
  }, []);
  
  console.log(orders);

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex w-full h-auto font-bold text-3xl py-4  pl-10">
        <span className="text-black">Orders List</span>
      </div>
      {/* Header */}
      <div className="grid grid-cols-7 gap-4 items-center w-full h-auto bg-black text-lime-300 rounded-full px-4 py-1 mb-2">
        <div className="text-sm font-bold flex justify-center items-center">
          UserId
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          UserName
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Email
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Quantity
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Order Price
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Order Status
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Order Create
        </div>
      </div>

      {/* Products */}
      {orders &&
        orders.map((item , index : number ) => (
          <motion.div
            initial="initial"
            animate="animate"
            custom={index}
            transition={{ duration: 0.8, delay: 0.3, easings: "easeInOut" }}
            variants={varliantsUsers}
            key={index}
            className="grid grid-cols-7 gap-4 items-center w-full h-auto bg-white border-b
             border-gray-100 rounded-sm  px-4 py-5 hover:shadow-sm 
             transition- duration-200 hover:-translate-y-0.5 transform text-zinc-800 font-[outfit]"
          >
            <div className="text-sm font-bold flex justify-center items-center">
                {item.id}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
                {item.user.name}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
                {item.user.email}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
                {item.products.reduce((acc , item) => acc + item.quantity , 0)}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
                {item.cartTotalPrice}
            </div>
            <div className={`text-sm font-bold flex justify-center items-center ${item.orderStatus === 'paid' ? 'text-lime-500' : 'text-orange-400'}`}>
                {item.orderStatus.toUpperCase()}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
                {formatDateTime(item.updateAt)}
            </div>
         
          </motion.div>
        ))}
    </div>
  );
};
export default OrderDashBoard;
