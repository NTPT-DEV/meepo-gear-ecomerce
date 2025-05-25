'use client'
import ListProduct from "../D-Components/ListProductSection";
import FormProductUpload from "../D-Components/FormProductUpload";
import { useMenuDashBoradStore } from "@/store/useDashboardStore";
import CategoryDashboard from "../D-Components/CategoryDashboard";
import UserDashboard from "../D-Components/UserDashboard";



const DashboardMainPage = () => {

  const selectedMenu = useMenuDashBoradStore((state) => state.selectedMenu);

  
  return (
    <div>
      {/* Right Side Content Section */}
      <div className="right-container flex flex-col max-w-full min-h-screen ml-[250px] mt-[70px] p-4">
        { selectedMenu === 'List Product' && <ListProduct />}
        { selectedMenu === 'Categorys' && <CategoryDashboard /> }
        { selectedMenu === 'Import Product' && <FormProductUpload /> }
        { selectedMenu === 'Customers' && <UserDashboard /> }
        
      </div>
    </div>
  );
};
export default DashboardMainPage;
