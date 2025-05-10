import Image from "next/image";
import Link from "next/link";
import BtnProductCard from "./BtnProductCard";

const ProductCard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 py-3">
      <div className="flex flex-col w-[250px] h-[420px] rounded-3xl shadow-sm  p-2 overflow-hidden hover:shadow-md transition-all duration-200 bg-white relative">
        <Link href="/product">
        <Image
          src={"/1024.png"}
          alt=""
          width={500}
          height={500}
          className="object-cover hover:scale-110 transition-transform duration-300 "
        />
        </Link>
        <h1 className="text-lg font-bold mt-2">Geforce RTX 5070Ti 16GB GDDR6</h1>
        <h3 className="text-sm font-semibold italic text-zinc-500">
          Geforce RTX 5070Ti 16GB GDDR6
        </h3>
        <div className="flex flex-col justify-center items-start w-full gap-y-2 mt-3 absolute bottom-3 left-0 p-3">
          <h1 className="text-2xl mt-3 font-bold">฿22,0000</h1>
          <BtnProductCard />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
