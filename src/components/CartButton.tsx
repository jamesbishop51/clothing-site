import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "~/store/cartStore";

const CartButton = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Link
      href="/checkout"
      className="flex items-center rounded bg-blue-500 p-2 text-white"
    >
      <span className="mr-2">Cart ({itemCount})</span>
      <FaShoppingCart size={30} />
    </Link>
  );
};

export default CartButton;
