import React from "react";
import CartButton from "./CartButton";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <Link href="/">
            <h1 className="ml-2 text-2xl font-bold">Wild West Stitchery</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
