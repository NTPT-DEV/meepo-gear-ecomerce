'use client'
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import axios from "axios"

interface ImageProduct  {
  public_id : string ,
  secure_url : string 
}
interface Category {
  name : string 
}

interface TypeGetProduct {
  id : string 
  name : string 
  title : string 
  description : string 
  price : number 
  quantity : number 
  category : Category
  categoryId : string
  images : ImageProduct[]
}

const NewAvirialsSection = () => {
  const [products , setProduct ] = useState<TypeGetProduct[]>([])

useEffect(() => {
    const  fetchProduct = async () => {
    try {
      const res = await axios.get("/api/product")
      if(!res) return []
      setProduct(res.data.products)
    }catch(err) {
      console.log(err);
    }
  }
  fetchProduct()
},[])

  return (
    <div className="container max-w-[1440px] flex flex-col justify-center items-start px-5 gap-y-10 mx-auto">
    <h1 className="px-10 text-4xl font-semibold italic">
      สินค้าใหม่<span className="w-6 h-6 animate-pulse">🔥</span>
    </h1>
    <div className="flex flex-wrap justify-center items-center gap-5 w-full h-auto ">
      <ProductCard products={products} />
    </div>
  </div>
  )
}
export default NewAvirialsSection