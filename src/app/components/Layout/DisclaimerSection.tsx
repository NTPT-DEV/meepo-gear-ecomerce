'use client'
import { Clock1, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react"
interface disclaimerDataType {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const disclaimerData: disclaimerDataType[] = [
  {
    icon: <Truck className="w-full h-auto" />,
    title: "ส่งฟรีทั่วไทย",
    description: "เมื่อช้อปครบ 5,000 บาทขึ้นไป",
  },
  {
    icon: <Clock1 className="w-full h-auto" />,
    title: "เปลี่ยนสินค้าง่าย",
    description: "เปลี่ยนใหม่ภายใน 7 วัน",
  },
  {
    icon: <ShieldCheck className="w-full h-auto" />,
    title: "บริการรวดเร็ว",
    description: "ตอบด่วน ตอบไว!",
  },
];


const DisclaimerSection = () => {
    return (
      <div className="container flex w-full  mx-auto justify-center items-center py-5 gap-5 my-10 flex-wrap">
        {disclaimerData.map((item, index) => {
          return (
            <motion.div
              initial={{ opacity: 0 , y : 5 }}
              whileInView={{ opacity: 1 , y : 0}}
              transition={{ duration: 0.8 , delay : index * 0.1 }}
              className="flex justify-center bg-white gap-2 items-center w-[250px] h-auto px-4 py-5 rounded-3xl shadow-sm"
              key={index}
            >
              <div className="flex justify-center items-center w-8 h-8 bg-gray-50 text-zinc-600 rounded-full animate-pulse">
                {item.icon}
              </div>
              <div className="flex flex-col text-zinc-700 -space-y-0.5 ">
                <h1 className="text-xl font-semibold text-nowrap">{item.title}</h1>
                <p className="text-sm text-zinc-500 text-nowrap">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };
export default DisclaimerSection;
