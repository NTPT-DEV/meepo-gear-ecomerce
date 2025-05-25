import axios from "axios";
import { Menu, Trash2 } from "lucide-react";
import Image from "next/image";
import { ProductType } from "schemas/productFormSchema";
import { TypeListProduct } from "./ListProductSection";

const ProductList = ({ products, setProducts }: TypeListProduct) => {
  interface ProductDeleteType {
    id: string;
    public_id: string[];
  }

  const handleDelete = async ({ id, public_id }: ProductDeleteType) => {
    try {
      if (!id) {
        console.log("id is required");
      }
      console.log(id, "This is ID of product on delete");
      console.log(public_id, "This is public_id");
      await axios.delete(`/api/product/${id}`, {
        data: { public_id },
      });
      setProducts((prev) => prev.filter((products) => products.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 justify-between items-center w-full h-auto bg-black text-lime-300 rounded-full px-4 py-1 mb-2">
        <div className="text-sm font-bold flex justify-center items-center">
          Image
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Name
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Category
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Quantity
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Price
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Menu
        </div>
      </div>

      {/* Products */}
      {products.length > 0 &&
        products.map((item: ProductType, index: number) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 items-center w-full h-auto bg-white border-b border-gray-100 rounded-sm px-4 py-2 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 transform"
          >
            <div className="flex justify-center items-center">
              <div className="text-sm font-bold flex justify-center items-center w-18 h-18 rounded-xl shadow-sm overflow-hidden bg-white p-1">
                <Image
                  className=""
                  src={item.images?.[0]?.secure_url}
                  alt={item.name}
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div className="text-sm font-bold flex justify-center items-center w-full">
              <div className="w-30 h-auto truncate text-center">
                <span>{item.name}</span>
              </div>
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {item.category.name.toUpperCase()}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {item.quantity}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {item.price}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              <div className="flex justify-center items-center gap-2 w-full">
                <div className="flex w-8 h-8  rounded-full relative overflow-hidden group">
                  <div className="flex absolute group-hover:-translate-x-[50%] transition-all duration-200 ease-in-out max-lg:hidden">
                    <div className="flex justify-center items-center w-8 h-8 bg-black ">
                      <Menu className="w-5 h-5 text-lime-300" />
                    </div>
                    <div
                      onClick={() => {
                        const public_ids = item.images.map(
                          (img) => img.public_id
                        );
                        handleDelete({ id: item.id, public_id: public_ids });
                      }}
                      className="flex justify-center items-center w-8 h-8  bg-red-500 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="text-white w-5 h-5" />
                    </div>

                  </div>
                  
                  {/* Hidden delete button */}
                    <div
                      onClick={() => {
                        const public_ids = item.images.map(
                          (img) => img.public_id
                        );
                        handleDelete({ id: item.id, public_id: public_ids });
                      }}
                      className="flex justify-center items-center w-8 h-8 rounded-full bg-red-500 active:scale-95 transition-all duration-200 cursor-pointer min-lg:hidden"
                    >
                      <Trash2 className="text-white w-5 h-5" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ProductList;
