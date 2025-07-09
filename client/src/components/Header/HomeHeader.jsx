import React from "react";
import Logo from "../logos/Logo";
import Bars from "../buttons/Bars";
const HomeHeader = () => {
  return (
    <>
      <div className="sidebar w-full h-16 flex items-center justify-between px-4 bg-white shadow-md">
        <div>
          <Logo />
        </div>
        <div>
          <Bars />
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
