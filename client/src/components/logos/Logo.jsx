import React from 'react'

const Logo = () => {
  return (
    <a href="/" className=" h-fit w-fit flex items-center">
      <img src="./logo.svg" alt="logo" className=" size-10 lg:size-10" />
      <p className="text-2xl Oswald text-center font-bold text-sky-600">UplinQ</p>
    </a>
  );
}

export default Logo