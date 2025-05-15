'use client';
import { useMenuDashBoradStore } from "@/store/useDashboardStore";
import {
  LayoutList,
  Package2,
  PackageOpen,
  ScrollText,
  UserPen,
} from "lucide-react";
import React from "react";

interface TmenuDashBoardData {
  icons: React.ReactNode;
  title: string;
}
const menuDashBoardData: TmenuDashBoardData[] = [
  { icons: <PackageOpen className="w-5 h-5" />, title: "List Product" },
  { icons: <LayoutList className="w-5 h-5" />, title: "Categorys" },
  { icons: <Package2 className="w-5 h-5" />, title: "Import Product" },
  { icons: <ScrollText className="w-5 h-5" />, title: "Orders" },
  { icons: <UserPen className="w-5 h-5" />, title: "Customers" },
];


const MenuDashBoard = () => {

const setSelectedMenu = useMenuDashBoradStore((state) => state.setSelectedMenu);

const handdleSelectMenu = (title : string) => {
  setSelectedMenu(title)
  console.log(title);
}

  return (
    <div>
      <div className="flex ">
        {/* Left menu section */}
        <div className="fixed z-50 top-18 left-0 flex flex-col w-[250px] h-screen">
          <div className="flex w-full h-auto justify-center bg-black py-5">
            <h1 className="text-[#BBFF00] font-bold text-center text-lg">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex flex-col items-center w-full h-full bg-[#BBFF00] ">
            {menuDashBoardData.map((item, index) => (
              <div
                key={index}
                className="flex w-full py-5 pl-5 items-center cursor-pointer  hover:bg-black hover:text-[#BBFF00] transition-all duration-200 hover:scale-105 origin-left"
              >
                <div 
                  onClick={() => handdleSelectMenu(item.title)}
                className="flex items-center justify-center w-full gap-3">
                  {item.icons}
                  <h3 className="w-full h-auto font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuDashBoard;
