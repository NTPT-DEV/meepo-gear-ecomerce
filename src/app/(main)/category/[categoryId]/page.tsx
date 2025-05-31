import ProductByCategory from "@/app/components/Layout/ProductByCategory";


const CategoryPage = async ({ params }: { params: Promise<{ categoryId: string }>}) => {
  
  const categoryId =  (await params).categoryId;

  return (
    <div>
      <ProductByCategory categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;
