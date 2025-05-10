import Link from "next/link";


const AdminBtn = () => {
  return (
    <button className="bg-white w-[95px] h-[30px] rounded-full flex justify-center items-center cursor-pointer">
      <Link href={"/dashboard"}>
        <span className="text-sm text-black italic font-semibold">Admin</span>
      </Link>
    </button>
  );
};
export default AdminBtn;
