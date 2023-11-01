import React from "react";
import CartButton from "./CartButton";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <h1 className="ml-2 text-2xl font-bold">Matthew sucks</h1>
        </div>
        <div className="flex items-center">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
