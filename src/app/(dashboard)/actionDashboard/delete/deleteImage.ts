import cloudinary from "../upload/cloudinary";

export const deleteImageCloudinary = async (public_id : string | string[]) => {
  try {
    if(!public_id || public_id.length === 0) {
      console.log('Not have public Id');
      return
    }
    if(Array.isArray(public_id)){
      const deleteResponse = await cloudinary.api.delete_resources(public_id)
      console.log(deleteResponse , 'Delete multiple images');
    } else {
      const deleteResponse = await cloudinary.api.delete_resources([public_id])
      console.log(deleteResponse , 'Delete single image');
    }
  
  }catch(error) {
    console.log(error , 'error in deleteImageCloudinary');
  }
}