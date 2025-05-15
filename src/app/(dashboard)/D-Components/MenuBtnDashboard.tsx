"use client";
import axios from "axios";
import { AlignJustify, Trash2 } from "lucide-react";

interface MenuBtnDashboardProps {
  id: string;
  public_id: string[];
  onDeleteSuccess: (id: string) => void;
}

const MenuBtnDashboard = ({
  id,
  public_id,
  onDeleteSuccess,
}: MenuBtnDashboardProps) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/category/${id}`, {
        data: { public_id },
      });

      if (response.status === 200) {
        if (typeof onDeleteSuccess === "function") {
          onDeleteSuccess(id);
        } else {
          console.log("onDeleteSuccess is not a function");
        }

        console.log("Delete catgeory Success");
      } else {
        console.log("Failed Delete catgeory");
      }
    } catch (err) {
      console.log(err, "Error Delete");
    }
  };

  return (
    <div className="flex justify-center items-center w-full gap-3">
      <div className="flex justify-center items-center bg-lime-300 w-12 h-12 rounded-full relative group overflow-hidden max-lg:hidden ">
        <button
          onClick={handleDelete}
          className="flex justify-center items-center cursor-pointer absolute left-0 group-hover:translate-x-[-50%] transitions-all duration-300 ease-in-out "
        >
          <div className="flex justify-center items-center bg-gray-100 w-12 h-12">
            <AlignJustify className="w-6 h-6 text-zinc-500" />
          </div>
          <div className="flex justify-center items-center bg-red-600  w-12 h-12">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
      <button
        onClick={handleDelete}
        className="flex justify-center items-center bg-red-600 rounded-full w-10 h-10 min-lg:hidden "
      >
        <Trash2 className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};
export default MenuBtnDashboard;
