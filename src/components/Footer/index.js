import React from "react";
import { Img } from "components";

export const Footer = () => {
  return (
    <div className="bg-white sticky bottom-0 border-t-2 border-gray-200 py-3 w-[100%]">
    <div className="text-center max-w-[991px] justify-between mx-auto">
      <Img src="images/main-beta.svg" className="w-36 mb-2 mx-auto" alt="" />
      <div className="text-sm font-semibold">70% of this application is created using DhiWise.</div>
    </div>
  </div>
  );
};
