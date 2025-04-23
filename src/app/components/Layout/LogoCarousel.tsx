import { logoBrand } from "@/utils/image-data";
import Image from "next/image";

const LogoCarousel= () => {
  return (
    <div className=" flex justify-center items-center gap-5 flex-wrap max-w-[1440px] mx-auto px-4 my-20">
        { logoBrand.map((item , index) => (
            <div className="flex justify-center items-center" key={index}>
                <Image src={item.src} alt={item.alt} width={100} height={50} className="opacity-80 h-12 object-contain" />
            </div>
        ))}
    </div>
  )
}
export default LogoCarousel