export default function Loading() {
  const lineStyles = [
    { top: "20%", animationDelay: "-5s" },
    { top: "40%", animationDelay: "-1s", animationDuration: "0.8s" },
    { top: "60%", animationDelay: "0s" },
    { top: "80%", animationDelay: "-3s", animationDuration: "0.5s" },
  ];

  return (
    <div className="absolute z-100 h-screen w-screen bg-background inset-0 font-bold text-9xl select-none">
      <div className="h-screen w-full overflow-hidden relative">
        {/* Speeder Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 animate-[speeder_0.4s_linear_infinite]">
          <span className="h-[5px] w-[35px] bg-theme absolute -top-[19px] left-[60px] rounded-[2px_10px_1px_0]"></span>
          <div className="relative">
            <span className="absolute w-0 h-0 border-t-[6px] border-r-100 border-b-[6px] border-transparent border-r-theme">
              <span className="absolute h-[22px] w-[22px] rounded-full bg-theme -right-[110px] -top-[16px]"></span>
              <span className="absolute w-0 h-0 border-t-0 border-r-55 border-b-16 border-transparent border-r-theme -top-[16px] -right-[98px]"></span>
            </span>
          </div>
          <div className="absolute h-[12px] w-[20px] bg-theme rounded-t-[20px] -rotate-40 -right-[125px] -top-[15px]">
            <span className="absolute h-[12px] w-[12px] bg-theme right-1 top-[7px] rotate-40 origin-center rounded-bl-[2px]"></span>
          </div>
        </div>

        {/* Moving Lines */}
        <div className="absolute w-full h-full">
          {lineStyles.map((style, index) => (
            <span
              key={index}
              className="absolute h-0.5 w-1/5 bg-theme animate-[lf_0.6s_linear_infinite]"
              style={{
                top: style.top,
                animationDelay: style.animationDelay,
                animationDuration: style.animationDuration,
              }}></span>
          ))}
        </div>
      </div>
    </div>
  );
}