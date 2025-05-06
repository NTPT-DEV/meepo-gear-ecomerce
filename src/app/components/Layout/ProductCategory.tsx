import Image from "next/image";

const ProductCategory = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2 ">
      <div className="flex flex-col w-[200px] h-[200px] justify-center items-center rounded-3xl shadow-sm p-2 hover:shadow-md transition-all duration-200 ">
        <Image src={'/1024.png'} alt="" width={500} height={500} className='object-cover hover:scale-110 transition-transform duration-300' />
      </div>
      <h1 className="text-2xl font-bold">GPU</h1>
    </div>
  );
};
export default ProductCategory;
