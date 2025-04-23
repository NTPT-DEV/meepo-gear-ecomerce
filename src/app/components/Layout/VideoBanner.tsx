const VideoBanner = () => {
  return (
    <div
    className=" flex justify-center items-center max-w-[1440px] h-[350px] max-sm:h-full mx-auto mb-10">
        <video 
        className="flex items-center justify-center w-full h-full rounded-3xl mx-4 overflow-hidden object-cover"
        src="video/VideoBanner.mp4" autoPlay loop muted playsInline/>
    </div>
  )
}
export default VideoBanner