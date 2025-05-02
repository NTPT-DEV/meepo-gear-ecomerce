import * as z from 'zod'

/////////////// Sign Up Schema /////////////////

export const SignUpSchema = z.object({
    email : z.string().email({
        message : 'Please enter a valid email address'
    }) , 
    name : z.string().min(6  , {
        message : 'Name must be at least 6 characters long'
    }),
    password : z.string().min(6 , {
        message : 'Password must be at least 6 characters long'
    }), 
    confirmPassword : z.string({
        message : "Password do not match"
    }) 
        
}).refine((data) => data.password === data.confirmPassword , {
    message : "Password do not match" , 
    path : ['confirmPassword']
})

export type SignUpTypeSchema = z.infer<typeof SignUpSchema>


/////////////// Login Schema /////////////////

export const SignInSchema = z.object({
    email : z.string().email({
        message : 'Please enter a valid email address'
    }),
    password : z.string().min( 6 ,{
        message : 'Password must be at least 8 characters long'
    })
})

export type SignInTypeSchema = z.infer<typeof SignInSchema>
