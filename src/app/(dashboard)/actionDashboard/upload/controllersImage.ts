// import axios from "axios";

// export const upLoadImageCloudinary = async (file: File) => {
//   if (!file) {
//     console.log("File not Select");
//     return;
//   }
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "upload-category");

//     const res = await axios.post("https://api.cloudinary.com/v1_1/dhmfewrsr/image/upload");
//     console.log(res.data);
//     return res.data
//   } catch (error) {
//     console.log(error, "Something error whten upload image");
//   }
// };
