import {
    LayoutList,
    Package2,
    ScrollText,
    // Search,
    UserPen,
  } from "lucide-react";
import FormProductUpload from "../../D-Components/FormProductUpload";
  
  interface TmenuDashBoardData {
    icons: React.ReactNode;
    title: string;
  }
  const menuDashBoardData: TmenuDashBoardData[] = [
    { icons: <LayoutList className="w-5 h-5" />, title: "Categorys" },
    { icons: <Package2 className="w-5 h-5" />, title: "Import Product" },
    { icons: <ScrollText className="w-5 h-5" />, title: "Orders" },
    { icons: <UserPen className="w-5 h-5" />, title: "Customers" },
  ];
  
  const DashBoardPage = () => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col w-[250px] min-h-screen">
          <div className="flex w-full h-auto justify-center bg-black py-5">
            <h1 className="text-[#BBFF00] font-bold text-center text-lg">Admin Dashboard</h1>
          </div>
          <div className="flex flex-col items-center w-full h-full bg-[#BBFF00] ">
            {menuDashBoardData.map((item, index) => (
              <div
                key={index}
                className="flex w-full py-5 pl-5 items-center cursor-pointer hover:bg-black hover:text-[#BBFF00] transition-all duration-200 hover:scale-105 origin-left"
              >
                <div className="flex items-center justify-center w-full gap-3">
                  {item.icons}
                  <h3 className="w-full h-auto font-semibold font-[Outfit]">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Right Side Content Section */}
  
        <div className="right-container flex flex-col w-full h-screen">
  
          {/* Category section */}
          <div className="flex w-full h-auto font-bold text-3xl py-4 pl-10">
            <span className="text-black">Import Product</span>
          </div>
  
            {/* Product List Section */}
  
            <div>
              <FormProductUpload />
            </div>
  
        </div>
      </div>
    );
  };
  export default DashBoardPage;
  