const VideoBanner = () => {
  return (
    <div className=" flex justify-center items-center w-full max-w-[1440px] h-[350px] max-sm:h-auto mb-10 mx-auto px-4">
      <video
        className="flex items-center justify-center w-full h-full rounded-3xl overflow-hidden object-cover"
        src="/video/VideoBanner.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};
export default VideoBanner;
