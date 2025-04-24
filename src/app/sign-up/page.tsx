
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  return (
    <div className="container mx-auto w-screen min-h-screen">
      <div className=" flex justify-center mt-20 ">
        <div className="flex justify-center items-center bg-white backdrop-blur-[2px] w-[400px] h-full rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ">
          <div className="flex flex-col w-full p-7">
            <div className="flex flex-col w-full h-auto items-center gap-1 mb-5">
              <h1 className="text-3xl font-extrabold">Register</h1>
              <h3 className="text-sm text-zinc-500">ลงทะเบียนผู้ใช้</h3>
            </div>

            {/* Login Form */}

            <form action="" className="flex flex-col w-full gap-y-4">
              {/* email */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Email</h3>
                <input
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="email"
                  placeholder="johnsnow@email.com"
                />
              </div>

              {/* Name */}

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Email</h3>
                <input
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="email"
                  placeholder="johnsnow@email.com"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Password</h3>
                <input
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="password"
                  placeholder="********"
                />
              </div>

              {/* Confirm Password */}

              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semi-bold">Confirm password</h3>
                <input
                  className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
                  type="password"
                  placeholder="********"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-sm text-zinc-700 font-semibold my-2">
                Forgot password ?
              </div>

              {/* Button Login Email */}
              <button className="bg-zinc-800 text-white font-bold py-3 rounded-lg">Register</button>
              {/* Button Login google */}
              <button className="bg-white flex justify-center items-center gap-2 border border-zinc-200 text-sm text-zinc-800 font-bold py-3 rounded-lg"><FcGoogle className="w-5 h-5" />Sign in with Google</button>
            </form>

            {/* Link to Register */}
            <div className="flex justify-center items-center text-xs my-5 text-zinc-700 hover:text-blue-800 transition-all duration-200">
                <Link href={'/sign-in'}><span>Already have an account</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
