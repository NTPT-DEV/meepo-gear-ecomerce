export interface ImageProduct  {
  public_id : string ,
  secure_url : string 
}
export interface Category {
  id : string
  name : string 
}

export interface TypeGetProduct {
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

export interface ProductCardProps {
  products: TypeGetProduct[];
}
