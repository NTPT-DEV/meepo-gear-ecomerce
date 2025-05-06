import ProductCard from "./ProductCard"

const NewAvirialsSection = () => {
  return (
    <div className="container max-w-[1440px] flex flex-col justify-center items-start px-5 gap-y-10 mb-10 mx-auto">
    <h1 className="px-10 text-4xl font-semibold italic">
      สินค้าใหม่<span className="w-6 h-6 animate-pulse">🔥</span>
    </h1>
    <div className="flex flex-wrap justify-center items-center gap-5 w-full h-auto ">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
  )
}
export default NewAvirialsSection