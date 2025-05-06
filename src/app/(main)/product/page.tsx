import AddWishList from "@/app/components/Layout/AddWishlist";
import BuyNowButton from "@/app/components/Layout/ButNowButton";
import ButtonAddToCart from "@/app/components/Layout/ButtonAddToCart";
import QuantityButton from "@/app/components/Layout/QuantityButton";
import Image from "next/image";


const ProductPage = () => {


  return (
    <div className="product-main-con flex flex-col flex-1 w-full max-w-[1440px] h-screen mx-auto px-10 gap-10">
      {/* Memu Navigation */}
      <div className="flex items-center w-full h-auto text-gray-500 text-sm gap-2 mt-5 font-[Outfit]">
        <span>Home {">"}</span>
        <span>Category {">"}</span>
        <span>Monitor</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-auto py-10">
        {/* Image Products */}

        <div className="flex flex-col items-center mb-5 gap-5">
          {/* Main Size Image */}
          <div className="flex justify-center items-center max-w-[500px] h-auto aspect-square rounded-4xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-200 ">
            <Image 
            className="w-full h-auto hover:scale-105 transition-all duration-300"
            src={"/1024.png"} alt="" width={500} height={500} />
          </div>

          {/* More Image */}

          <div className="flex justify-between max-w-[500px] gap-3 px-8 py-2">
            <div className="flex justify-center items-center w-full max-w-[150px] h-auto  aspect-square rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200  ">
              <Image src={"/1024.png"} alt="" width={500} height={500} />
            </div>
            <div className="flex justify-center items-center w-full max-w-[150px] h-auto  aspect-square rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200  ">
              <Image src={"/1024.png"} alt="" width={500} height={500} />
            </div>
            <div className="flex justify-center items-center w-full max-w-[150px] h-auto  aspect-square rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-200  ">
              <Image src={"/1024.png"} alt="" width={500} height={500} />
            </div>
          </div>
        </div>

        {/* Product Details */}

        <div className="details-container flex flex-col gap-2 bg-white w-full p-5 ">
          <div className="text-4xl font-bold">Name</div>
          <div className="text-2xl font-semibold">tiltle</div>
          <div className="text-md text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Dignissimos, numquam? Veniam, vel officia reprehenderit quae minus
            iure rerum debitis repellat.
          </div>

          <div className="text-4xl font-bold mt-5">฿90000</div>
          <div className="flex justify-between items-center gap-3 w-full pr-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm">Quantity</span>
              {/* Button Quantity */}
              <QuantityButton />
            </div>

            {/* Add Wishlist */}
            <AddWishList />

          </div>
          {/* Button Add to Cart and But Now */}
          <ButtonAddToCart />
          <BuyNowButton />

        {/* Spec details*/}
        <div className="flex  flex-col w-full h-auto my-12 gap-1">
          <h3 className="text-xl font-bold text-zinc-700">Details :</h3>
          <p className="text-sm text-zinc-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolorem unde ex sunt! Debitis earum officia soluta quas eveniet? Asperiores, reiciendis voluptatum deleniti quas laudantium recusandae nisi vero quo et, molestias quod possimus similique suscipit. Suscipit, laudantium obcaecati dolorum distinctio reiciendis dolores perferendis iste quaerat quis dolore, vero ut voluptates?</p>
        </div>

        </div>
      </div>
    </div>
  );
};
export default ProductPage;
