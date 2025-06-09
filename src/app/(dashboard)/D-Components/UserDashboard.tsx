import axios from "axios";
import { useEffect, useState } from "react";
import { TusersSchema } from "schemas/usersSchema";
import { motion } from "motion/react";

import { useSession } from "next-auth/react";
import { formatDateTime } from "@/lib/utils";

export const varliantsUsers = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

const UserDashboard = () => {
  const [acounts, setAcounts] = useState<TusersSchema[]>();
  const getUser = useSession()
  const currentUserRole = getUser.data?.user.role

  // All Users
  useEffect(() => {
    const gellAllUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        const userData = await res.data.usersAccounts;
        setAcounts(userData);
      } catch (err) {
        console.log(err, "Error to get all users");
      }
    };
    gellAllUsers();
  }, []);

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    //Role check before edit status
    if(currentUserRole === 'user' || null)return
    
    try {
      const newStatus = !currentStatus;
      console.log(newStatus, "New Status");
      await axios.patch(`/api/users/${userId}`, { statusUser: newStatus });
      
      setAcounts((prev) => 
        prev?.map((user) => 
          user.id === userId ? {...user , statusUser: newStatus} : user
        ))

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex w-full h-auto font-bold text-3xl py-4  pl-10">
        <span className="text-black">User Accounts</span>
      </div>
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 items-center w-full h-auto bg-black text-lime-300 rounded-full px-4 py-1 mb-2">
        <div className="text-sm font-bold flex justify-center items-center">
          UserId
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          UserName
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Email
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Role
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Create AT
        </div>
        <div className="text-sm font-bold flex justify-center items-center">
          Status User
        </div>
      </div>

      {/* Products */}
      {acounts &&
        acounts.map((user, index) => (
          <motion.div
            initial="initial"
            animate="animate"
            custom={index}
            transition={{ duration: 0.8, delay: 0.3, easings: "easeInOut" }}
            variants={varliantsUsers}
            key={index}
            className="grid grid-cols-6 gap-4 items-center w-full h-auto bg-white border-b
             border-gray-100 rounded-sm  px-4 py-5 hover:shadow-sm 
             transition- duration-200 hover:-translate-y-0.5 transform text-zinc-800 font-[outfit]"
          >
            <div className="text-sm font-bold flex justify-center items-center">
              {user.id}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.name}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.email}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.role.toLocaleUpperCase()}
            </div>
            <div className="text-sm font-bold flex justify-center items-center">
              {user.createAt ? formatDateTime(user.createAt) : 'Unknow' }
            </div>
            <div className="text-sm font-bold flex justify-center items-center gap-3 w-full h-full">
              <motion.div
              className="font-[outfit] text-sm"
              >{user.statusUser ? "Enable" : "Disable"}</motion.div>
              <div
                onClick={()=> user.id && handleToggleStatus(user.id, user.statusUser) }
                className="flex justify-center items-center w-12 h-full bg-gray-100 rounded-full py-3 relative border border-gray-50"
              >
                <div
                  className={`w-5 h-5 rounded-full absolute ${
                   user.statusUser
                      ? "bg-lime-300 left-1 shadow-sm"
                      : "bg-red-500 translate-x-2.5 shadow-sm"
                  } transition-transform-colors duration-100`}
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
};
export default UserDashboard;
