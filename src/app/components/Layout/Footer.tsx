import { BsLine } from "react-icons/bs"
import { FaFacebook } from "react-icons/fa"
import LogoMeepoGearV2 from "../logoSvg/LogoMeepoGearV2"
import Link from "next/link"

const Footer = () => {
  return (
    <div className="bottom-0 left-0 right-0">
      <div className="footer bg-black w-full h-[100px] rounded-t-[150px] relative ">
        <div className="flex justify-between items-center px-10 rounded-[20px] rounded-t-[50px] max-w-[90%] 
        w-full h-[70px] left-0 right-0 mx-auto -top-3 bg-lime-400 absolute
        max-[760px]:flex-col max-[760px]:h-auto max-[760px]:gap-3 max-[760px]:py-5 max-[760px]:-top-10 max-[760px]:rounded-t-[100px]
        max-sm:-top-12 max-[520px]:-top-50
        ">
            <Link href="/"><LogoMeepoGearV2 className="text-black w-auto h-4 cursor-pointer"/></Link>
            <p className="text-center text-[12px] text-nowrap max-[520px]:text-wrap">© 2023 Meepo Gear All Rights. | Terms & Conditions | Privacy Policy</p>
            <div className="flex gap-2 justify-center items-center">
            <FaFacebook className='w-6 h-6 text-black' />
            <BsLine className='w-6 h-6 text-black' />
            </div>
        </div>
    </div>
    </div>
  )
}
export default Footer