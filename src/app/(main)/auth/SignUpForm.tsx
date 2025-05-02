
"use client"
import { Check, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from "schemas/formSchemas";
import type { SignUpTypeSchema } from "schemas/formSchemas";
import { useState } from "react";
import { registerAction } from "@/app/(main)/actions/register"
import { useRouter } from "next/navigation";
import ButtonGoogle from "../../components/Layout/compReuse/ButtonGoogle";


const SignUpForm = () => {
  
  const [ loading , setLoding ] = useState(false);
  const router = useRouter();

  
  const { register, handleSubmit, reset, watch ,  formState: { errors , isSubmitSuccessful } }  = useForm<SignUpTypeSchema>({
    resolver: zodResolver(SignUpSchema), 
    defaultValues : {
      email : '',
      name : '',
      password : '',
      confirmPassword : ''
    }}
  );

  const onSubmit = async (data : SignUpTypeSchema) => {
    
    setLoding(true);

    const response = await registerAction(data) 
    
    await new Promise((resolve) => setTimeout(resolve , 1000));
    
    if(response.success) {
      reset();
      router.push("/auth/sign-in");
    }

    setLoding(false);
    
  }

  return (
    <div className="container mx-auto w-screen h-full">

      <div className=" flex justify-center my-10">
        <div className="flex justify-center items-center bg-white backdrop-blur-[2px] w-[400px] h-full rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ">
          <div className="flex flex-col w-full p-7">
            <div className="flex flex-col w-full h-auto items-center gap-1 mb-4">
              <h1 className="text-3xl font-extrabold">Register</h1>
              <h3 className="text-sm text-zinc-500">ลงทะเบียนผู้ใช้</h3>
            </div>

            {/* Register Form */}

            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-y-4">
              {/* email */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Email</h3>
                <input
                  {...register('email' , {
                    required: 'Email is required'
                  })}
                  className={`text-sm border ${ errors.email ? 'border-red-500' : 'border-zinc-200'} w-full h-auto px-4 py-3 rounded-lg`}
                  type="email"
                  placeholder="johnsnow@email.com"
                />
              </div>

              {/* Name */}

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Name</h3>
                <input
                   {...register('name')}
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Password</h3>
                <input
                  {...register('password')}
                  className={`text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg`}
                  type="password"
                  placeholder="********"
                />
              </div>

              {/* Confirm Password */}

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Confirm password</h3>
                <input
                   {...register('confirmPassword')}
                   className={`text-sm border ${ watch('password') !== watch('confirmPassword') ? 'border-red-500' : 'border-zinc-200'} w-full h-auto px-4 py-3 rounded-lg`}
                   type="password"
                  placeholder="********"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-sm text-zinc-700 font-semibold my-2">
                Forgot password ?
              </div>

              {/* Button Login Email */}
              <button 
                type="submit"
                disabled={loading}
                className="bg-zinc-800 text-white font-bold py-3 rounded-lg active:scale-95 transition-all duration-200">
                { loading ? 
                <span className="flex justify-center items-center gap-2">Loading...<LoaderCircle className="w-5 h-5 text-white animate-spin" /></span> 
                : "Register"}
                </button>

            </form>
              {/* Button Login google */}
              <ButtonGoogle />

            {/* Status Register */}
                {errors.email && 
                <div className=" flex justify-center items-center w-full py-3 text-white text-center text-sm bg-red-700 my-2 rounded-lg">{errors.email.message}</div>
                }
                {errors.name && 
                <div className=" flex justify-center items-center w-full py-3 text-white text-center text-sm bg-red-700 my-2 rounded-lg">{errors.name.message}</div>
                }
                {errors.password && 
                <div className=" flex justify-center items-center w-full py-3 text-white text-center text-sm bg-red-700 my-2 rounded-lg">{errors.password.message}</div>
                }
                {errors.confirmPassword && 
                <div className=" flex justify-center items-center w-full py-3 text-white text-center text-sm bg-red-700 my-2 rounded-lg">{errors.confirmPassword.message}</div>
                }
                {isSubmitSuccessful ? 
                <div className=" flex justify-center items-center w-full py-3 text-center bg-lime-500 my-2 rounded-lg gap-2">
                  <span className="text-white text-sm">User create successfully</span>
                  <Check className="w-6 h-6 text-lime-500 bg-white rounded-full p-1"/>
                  </div> : ''
                }
       
            {/* Link to Register */}
            <div className="flex justify-center items-center text-xs my-5 text-zinc-700 hover:text-blue-800 transition-all duration-200">
                <Link href={'/auth/sign-in'}><span>Already have an account</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;
