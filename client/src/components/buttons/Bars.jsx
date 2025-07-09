import React from "react";

const Bars = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className="flex flex-col justify-center items-center gap-1 lg:hidden cursor-pointer w-8 h-8 "
      onClick={(e) => {
        // Prevent the click event from propagating to parent elements
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <div
        className={`${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        } w-7 h-0.5 bg-sky-600 transition-all duration-300 ease-in-out`}
      ></div>
      <div
        className={`${
          isOpen ? "opacity-0" : ""
        } w-7 h-1 bg-sky-600 rounded-md transition-all duration-300 ease-in-out`}
      ></div>
      <div
        className={`${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        } w-7 h-0.5 bg-sky-600 transition-all duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default Bars;
