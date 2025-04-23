import { Menu } from "lucide-react";

const Menubar = () => {
  return (
      <div className="container-menubar flex justify-center items-center gap-6 w-full h-[72px] py-7 bg-[#F5F5F0]/50 mb-4">
      {/* button category */}
      <div className="flex justify-center items-center gap-1 bg-black w-30 h-9 rounded-full active:scale-90 transition-transform duration-100 cursor-pointer">
        <Menu className="text-white w-6 h-6" />
        <span className="text-sm text-white font-semibold">หมวดหมู่</span>
      </div>

      {/* Menu List */}
      <div className="flex justify-center items-center gap-5 font-bold text-md">
        <span>สินค้าใหม่</span>
        <span>โปรโมชั่น</span>
        <span>บทความ</span>
      </div>
    </div>
   
  );
};
export default Menubar;
