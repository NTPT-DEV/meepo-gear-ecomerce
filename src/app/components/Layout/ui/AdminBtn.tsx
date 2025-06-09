import Link from "next/link";


const AdminBtn = ({className} : {className?: string}) => {
  return (
    <button className={className}>
      <Link href={"/dashboard"}>
        <span className="text-sm text-black italic font-semibold">Admin</span>
      </Link>
    </button>
  );
};
export default AdminBtn;
