import {z} from 'zod'


export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  quantity: z.coerce.number().min(1, "Quantity is required"),
  category: z.string().min(1, "Category is required"),
  
  // productImage: z
  //   .any()
  //   .refine((files) => files?.length > 0, "Image is required at least 1 image"),
  productImage: z
    .unknown()
});


export type TypeProductSchema = z.infer<typeof ProductSchema>


export const ImageUrlType = z.object({
  asset_id : z.string() ,
  public_id : z.string() ,
  url : z.string(),
  secure_url : z.string()
})

export const ProductImageUrlArray = z.array(ImageUrlType)

export type TImageUrlType = z.infer<typeof ImageUrlType>
export type TImageUrlTypeArray = z.infer<typeof ProductImageUrlArray>


