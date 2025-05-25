import Image from "next/image";
import Link from "next/link";
import BtnProductCard from "./BtnProductCard";

interface ProductCardProps {
  products: TypeGetProduct[];
}

interface ImageProduct {
  public_id: string;
  secure_url: string;
}
interface Category {
  name: string;
}

interface TypeGetProduct {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  images: ImageProduct[];
}

const ProductCard = ({ products }: ProductCardProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 py-3 ">
      {products.map((item , index) => index < 10 &&(
        <div
          key={item.id}
          className="flex flex-col w-[250px] h-[480px] rounded-3xl shadow-sm  p-2 overflow-hidden hover:shadow-md transition-all duration-200 bg-white relative"
        >
          <Link href={`/product/${item.id}`}>
            <div className="flex justify-center items-center w-full p-5">
              <Image
                src={item.images[0].secure_url}
                alt=""
                width={300}
                height={300}
                className="object-cover hover:scale-110 transition-transform duration-300 "
              />
            </div>
          </Link>
          <div className="w-full flex flex-col gap-1 p-3">
            <h1 className="text-lg font-bold mt-2 line-clamp-2">{item.name}</h1>
            <h3 className="text-sm font-semibold italic text-zinc-500  line-clamp-2">
              {item.title}
            </h3>
            <div className="flex flex-col justify-center items-start w-full gap-y-2 mt-3 absolute bottom-3 left-0 p-5">
              <h1 className="text-2xl mt-3 font-bold">฿{item.price}</h1>
              <BtnProductCard />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductCard;
