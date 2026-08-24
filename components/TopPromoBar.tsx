import React from "react";

const TopPromoBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-[999] bg-white border-b border-blue-500">
      
      <div className="relative flex items-center h-11 overflow-hidden">

        {/* Marquee */}
        <div className="flex animate-marquee whitespace-nowrap text-[12px] font-bold text-blue-600">
          
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span>🚀 10X YOUR BUSINESS</span>
              <span>DX ERP TOOL</span>
              <span>GET MORE REVIEWS</span>
              <span>AUTOMATE MARKETING</span>
              <span>INCREASE SALES</span>
            </div>
          ))}

        </div>

        {/* ACTION BUTTON */}
       <a
  href="https://dxerp.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 text-xs font-black rounded-md border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition-all"
>
  TRY FREE
</a>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          min-width: max-content;
          animation: marquee 14s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TopPromoBar;