'use client'
import ListProduct from "../D-Components/ListProductSection";
import FormProductDashboard from "../D-Components/FormProductDashboard";
import { useMenuDashBoradStore } from "@/store/useDashboardStore";
import CategoryDashboard from "../D-Components/CategoryDashboard";
import UserDashboard from "../D-Components/UserDashboard";
import OrderDashBoard from "../D-Components/OrderDashBoard";

const DashboardMainPage = () => {

  const selectedMenu = useMenuDashBoradStore((state) => state.selectedMenu);

  
  return (
    <div>
      {/* Right Side Content Section */}
      <div className="right-container flex flex-col max-w-full min-h-screen ml-[250px] mt-[70px] p-4">
        { selectedMenu === 'List Product' && <ListProduct />}
        { selectedMenu === 'Categorys' && <CategoryDashboard /> }
        { selectedMenu === 'Import Product' && <FormProductDashboard /> }
        { selectedMenu === 'User Customers' && <UserDashboard /> }
        { selectedMenu === 'Orders' && <OrderDashBoard /> }
        
      </div>
    </div>
  );
};
export default DashboardMainPage;
