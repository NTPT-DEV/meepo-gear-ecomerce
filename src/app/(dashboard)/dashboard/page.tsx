
'use client'
import ListProduct from "../D-Components/ListProductSection";
import FormProductUpload from "../D-Components/FormProductUpload";
import { useDashBoradStore } from "@/store/useDashboardStore";
import CategoryDashboard from "../D-Components/CategoryDashboard";



const DashboardMainPage = () => {


  const selectedMenu = useDashBoradStore((state) => state.selectedMenu);

  
  return (
    <div>
      {/* Right Side Content Section */}
      <div className="right-container flex flex-col max-w-full min-h-screen ml-[250px] mt-[70px] p-4">
        { selectedMenu === 'List Product' && <ListProduct />}
        { selectedMenu === 'Categorys' && <CategoryDashboard /> }
        { selectedMenu === 'Import Product' && <FormProductUpload /> }
        
      </div>
    </div>
  );
};
export default DashboardMainPage;
