import axios from "axios";

export const upLoadImageCloudinary = async (fileList: FileList) => {

  const uploadMultiple: {
    asset_id: string;
    public_id: string;
    url: string;
    secure_url: string;
  }[] = [];
  
  for (const file of fileList) {
    if (!file.type.startsWith("image/")) {
      console.log(file.name, ": This file is not Iamge type");
      continue;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_image");

    try {
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const { asset_id, public_id, url, secure_url } = uploadResponse.data;
      uploadMultiple.push({ 
        asset_id, 
        public_id, 
        url, 
        secure_url 
      });
      

    } catch (error) {
      console.log(error);
    }
  }
  return uploadMultiple;
};



// const const uploadProductImage = async(fileList : File)


