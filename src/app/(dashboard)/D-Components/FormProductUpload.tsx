const FormProductUpload = () => {
  return (
    // import Produt Section
    <div className="flex justify-center items-center w-full p-5 h-auto flex-1 bg-red-500">
      <form className="max-w-[700px] w-full px-10">

        {/* Name Product */}
        <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-lg font-bold text-black">Name</h1>
          <input
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
            type="text" placeholder="Name Product"
          />
        </div>

        {/* Title */}

        <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-lg font-bold text-black">Title</h1>
          <input
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
            type="text" placeholder="Title Product"
          />
        </div>


        {/* Description */}

        <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-lg font-bold text-black">Description</h1>
          <textarea
            className="flex text-sm border border-zinc-200 w-full h-[200px] px-4 py-3 rounded-lg"
            placeholder="Description Product"
          />
        </div>



      </form>

    </div>
  );
};
export default FormProductUpload;
