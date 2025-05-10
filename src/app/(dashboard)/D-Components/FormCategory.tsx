const FormCategory = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="mt-3 flex justify-center items-center w-full h-full flex-1">
      <form action="" className=" w-full h-full bg-white ">
        <div className="flex justify-center items-end w-full gap-5 border border-zinc-200 rounded-lg py-5 mb-2 bg-white shadow-md shadow-lime-100">
          <div className="flex flex-col items-center gap-1">
            <label className="text-lg font-bold text-black">
              Upload Images
            </label>
            <input
              className="text-sm border border-zinc-200 w-[200px] h-auto px-4 py-3 rounded-lg"
              type="file"
              accept="Images/*"
              multiple
            />
          </div>

          <div className="flex flex-col items-center gap-1 ">
            <label className="text-lg font-bold text-black">Name</label>
            <input
              className="text-sm border border-zinc-200 w-full h-auto px-4 py-3 rounded-lg"
              type="text"
              placeholder="Name Category"
            />
          </div>

          <button
            onSubmit={handleSubmit}
            type="submit"
            className="flex items-center justify-center w-22 h-9 rounded-full bg-lime-300 text-black font-bold hover:text-lime-300 hover:bg-black transition-all duration-200 font-[Outfit] active:scale-95"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormCategory;
