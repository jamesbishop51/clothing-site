import React from "react";
import CartButton from "./CartButton";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex flex-col items-center justify-between p-4 sm:flex-row">
        <Link href="/">
          <div className="mb-2 flex items-center sm:mb-0">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <span className="ml-2 text-xl font-bold sm:text-2xl">
                WildWest Stitchery
              </span>
            </div>
            {/* Add a dash here */}
            <span className="mx-2 my-2 text-xl font-bold text-gray-500 sm:my-0 sm:text-2xl">
              -
            </span>
            <div className="flex items-center">
              <Image
                src="/other-logo.png"
                alt="Other Logo"
                width={50}
                height={50}
              />
              <span className="ml-2 text-xl font-bold sm:text-2xl">
                J&J GAME DEALING
              </span>
            </div>
          </div>
        </Link>
        <div className="ml-auto flex items-center">
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
