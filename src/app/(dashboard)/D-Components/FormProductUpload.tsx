const FormProductUpload = () => {
  return (
    // import Produt Section
    <div className="flex justify-center">
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
          <h1 className="text-lg font-bold text-black">Name</h1>
          <input
            className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
            type="text" placeholder="Name Product"
          />
        </div>


        {/* Description */}

        <div className="flex flex-col gap-1 mb-5">
          <h1 className="text-lg font-bold text-black">Name</h1>
          <input
            className="text-sm border border-zinc-200 w-full h-[200px] px-4 py-3 rounded-lg"
            type="text" placeholder="Description Product"
          />
        </div>



      </form>

    </div>
  );
};
export default FormProductUpload;
