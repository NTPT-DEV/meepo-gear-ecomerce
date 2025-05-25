import axios from "axios";
import { useEffect, useState } from "react";
import { TusersSchema } from "schemas/usersSchema";

const UserDashboard = () => {
  const [acounts, setAcounts] = useState<TusersSchema[]>();
 // All Users
  useEffect(() => {
    const gellAllUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        console.log(res.data.usersAccounts);
        setAcounts(res.data.usersAccounts);
      } catch (err) {
        console.log(err, "Error to get all users");
      }
    };
    gellAllUsers();
  }, []);


//   const handleRole = () => {

//   }


  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex w-full h-auto font-bold text-3xl py-4  pl-10">
        <span className="text-black">User Accounts</span>
      </div>
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 items-center w-full h-auto bg-black text-lime-300 rounded-full px-4 py-1 mb-2">
        <div className="text-sm font-bold flex justify-center items-center">
          Name
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Email
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Role
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Status User
        </div>
      </div>

      {/* Products */}
      {acounts &&
        acounts.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 items-center w-full h-auto bg-white border-b
             border-gray-100 rounded-sm  px-4 py-5 hover:shadow-sm 
             transition-all duration-200 hover:-translate-y-0.5 transform text-zinc-800"
          >
            <div className="text-sm font-bold flex justify-center items-center">
              {user.name}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.email}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.role}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.statusUser ? "Enable" : "Disable"}
            </div>
          </div>
        ))}
    </div>
  );
};
export default UserDashboard;
