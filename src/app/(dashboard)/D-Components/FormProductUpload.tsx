const FormProductUpload = () => {
  return (
    // import Produt Section
    <div className="flex justify-center items-center w-full p-5 h-auto flex-1 ">
      <form className="max-w-[700px] w-full px-10">


        {/* Upload Images */}
        <div className="flex flex-col gap-1 mb-5">
          <label className="text-lg font-bold text-black">Upload Images</label>
          <input
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
            type="file"
            accept="Images/*"
            multiple
          />
        </div>


        {/* Preview Image Uploading Section */}


        {/* Name Product */}
        <div className="flex flex-col gap-1 mb-5">
          <label className="text-lg font-bold text-black">Name</label>
          <input
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
            type="text"
            placeholder="Name Product"
          />
        </div>

        {/* Title */}

        <div className="flex flex-col gap-1 mb-5">
          <label className="text-lg font-bold text-black">Title</label>
          <input
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
            type="text"
            placeholder="Title Product"
          />
        </div>

        {/* Description */}

        <div className="flex flex-col gap-1 mb-5">
          <label className="text-lg font-bold text-black">Description</label>
          <textarea
            className="flex text-sm border border-zinc-200 w-full h-[200px] px-4 py-3 rounded-lg"
            placeholder="Description Product"
          />
        </div>

        {/* Price */}

        

        {/* Container Price & Quantity */}
        <div className="flex justify-between w-full h-auto gap-5 max-md:flex-col">
          {/* Quantity */}

          <div className="flex flex-col gap-1 mb-5 w-full">
            <label className="text-lg font-bold text-black">Quantity</label>
            <input
              className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
              type="text"
              placeholder="Quantity"
            />
          </div>

          {/* Category */}

          <div className="flex flex-col gap-1 mb-5 w-full">
            <label className="text-lg font-bold text-black">Price</label>
            <select className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg">
              <option value="ram">Category 1</option>
              <option value="ram">Category 2</option>
              <option value="ram">Category 3</option>
              <option value="ram">Category 4</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};
export default FormProductUpload;
