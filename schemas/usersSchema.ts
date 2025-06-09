import * as z from 'zod';

export const usersSchema = z.object({
    id : z.string().optional(),
    name : z.string(),
    email : z.string().email(),
    statusUser : z.boolean(), 
    role : z.string(),
    phone : z.string().optional(),
    address : z.string().optional(),
    order : z.array(z.string()).optional(),
    carts : z.array(z.string()).optional(),
    createAt : z.string().optional(),
    updateAt : z.string().optional(),

})
export type TusersSchema = z.infer<typeof usersSchema>