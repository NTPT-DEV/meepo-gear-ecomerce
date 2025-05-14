import { X } from "lucide-react";
import Image from "next/image";

const PreviewImage = () => {
  return (
      <div
        className={`w-[100px] h-full rounded-2xl aspect-square relative overflow-hidden group`}
      >
        <Image
          src={
            "https://res.cloudinary.com/dhmfewrsr/image/upload/v1746966457/blackwell-geforce-rtx-50-series_cdiswm.jpg"
          }
          width={500}
          height={500}
          alt={"image"}
          className="object-cover w-full h-full"
        />
        <div
          className="bg-white w-6 h-6 absolute top-2 right-2 rounded-full flex justify-center items-center
            opacity-0 group-hover:opacity-100 transition-all duration-400 hover:rotate-180
            "
        >
          <X className="w-5 h-5" />
        </div>
      </div>
  );
};
export default PreviewImage;
