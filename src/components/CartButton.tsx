import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const CartButton = () => {
  return (
    <Link
      className="flex items-center rounded bg-blue-500 p-2 text-white"
      href="/checkout"
    >
      <span className="mr-2">Cart</span>
      <FaShoppingCart size={30} />
    </Link>
  );
};

export default CartButton;
