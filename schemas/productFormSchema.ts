import {z} from 'zod'

// export const ProductSchema = z.object({
//     name: z.string().min(3 , {
//         message: 'Name is required'
//     }),
//     title: z.string().min(3 , {
//         message: 'Title is required'
//     }), 
//     description: z.string().min(3 , {
//         message: 'Description is required'
//     }),
//     price: z.number({
//         required_error: 'Price is required'
//     }).min(1 , {
//         message: 'Price must be greater than 0'
//     }),
//     quantity: z.number({
//         required_error: 'Quantity is required'
//     }).min(1 , {
//         message: 'Quantity must be greater than 0'
//     }), 
//     productImage : z.unknown(),
//     category : z.string()

  
// })

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  quantity: z.coerce.number().min(1, "Quantity is required"),
  category: z.string().min(1, "Category is required"),
  productImage: z
    .any()
    .refine((files) => files?.length > 0, "Image is required at least 1 image"),
});


export type TypeProductSchema = z.infer<typeof ProductSchema>





// export const getProductByTypeSchema = z.object({
//     sort : z.string(),
//     order: z.enum(['asc', 'desc']),
//     limit: z.number().min(1, { message: 'Limit must be at least 1' }),
//     quantity: z.number().min(1, { message: 'Quantity is required' })
// })
// export type TgetProductByTypeSchema = z.infer<typeof getProductByTypeSchema>


// export const SearchTypeSchema = z.object({
//     query : z.string().optional(),
//     category : z.array(z.string()).optional(),
//     price : z.string().optional()
// })
// export type TSearchTypeSchema = z.infer<typeof SearchTypeSchema>