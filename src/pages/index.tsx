import { api } from "~/utils/api";
import Image from "next/image";
import { useState } from "react";

type Size = {
  Id: number;
  Size: string;
  InStock: number;
  ColourId: number;
};

type Colour = {
  Id: number;
  Name: string;
  Image: string;
  ProductId: number;
  Size: Size[]; // You might need to update this if the actual field name is different
};

type Product = {
  Id: number;
  code: string;
  Name: string;
  Description: string;
  Price: number;
  Colours: Colour[];
};

interface CartItem {
  product: Product;
  colour: Colour;
  size: Size;
  quantity: number;
}

function ProductCard({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (item: CartItem) => void;
}) {
  const [selectedColour, setSelectedColour] = useState(product.Colours[0]);
  const [selectedSize, setSelectedSize] = useState(selectedColour?.Size[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!selectedColour || !selectedSize) {
    return null; // or some fallback UI
  }

  return (
    <div
      key={product.Id}
      className="m-5 mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-md md:max-w-3xl"
    >
      <div key={product.Id} className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            width={500}
            height={500}
            className="h-48 w-full object-contain md:w-48"
            src={selectedColour.Image}
            alt={selectedColour.Name}
          />
        </div>
        <div className="p-8">
          <div className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            {product.Name}
          </div>
          <div className="flex space-x-4">
            <select
              className="mt-2 rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
              value={selectedColour.Id}
              onChange={(e) =>
                setSelectedColour(
                  product.Colours.find(
                    (colour) => colour.Id === Number(e.target.value),
                  ),
                )
              }
            >
              {product.Colours.map((colour) => (
                <option key={colour.Id} value={colour.Id}>
                  {colour.Name}
                </option>
              ))}
            </select>
            <select
              className="mt-2 rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
              value={selectedSize.Id}
              onChange={(e) =>
                setSelectedSize(
                  selectedColour.Size.find(
                    (size) => size.Id === Number(e.target.value),
                  ),
                )
              }
            >
              {selectedColour.Size.map((size) => (
                <option key={size.Id} value={size.Id} disabled={!size.InStock}>
                  {size.Size}
                </option>
              ))}
            </select>
            <select
              className="mt-2 rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            >
              {[...Array(9).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              className="mt-2 rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
              onClick={() =>
                addToCart({
                  product: product,
                  colour: selectedColour,
                  size: selectedSize,
                  quantity: selectedQuantity,
                })
              }
            >
              Add to Cart
            </button>
          </div>
          <p className="mt-2 text-gray-500">{product.Description}</p>
        </div>
        <div className="flex items-center justify-between p-8">
          <span className="font-bold text-slate-700">{product.Price}</span>
        </div>
      </div>
    </div>
  );
}

function CartItemCard({
  item,
  removeFromCart,
  updateQuantity,
}: {
  item: CartItem;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
}) {
  return (
    <div className="m-5 mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-md md:max-w-3xl">
      <div className="p-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-700">
          {item.product.Name}
        </div>
        <p className="mt-2 text-gray-500">Colour: {item.colour.Name}</p>
        <p className="mt-2 text-gray-500">Size: {item.size.Size}</p>
        <p className="mt-2 text-gray-500">
          Quantity:
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item, Number(e.target.value))}
          >
            {[...Array(9).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </p>
        <p className="mt-2 text-gray-500">
          Price: {item.product.Price * item.quantity}
        </p>
        <button
          className="mt-2 rounded-md border border-transparent bg-slate-600 px-4 py-2 text-base font-medium text-white hover:bg-slate-700"
          onClick={() => removeFromCart(item)}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

function Cart({
  cart,
  removeFromCart,
  updateQuantity,
}: {
  cart: CartItem[];
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;

}) {
  const total = cart.reduce(
    (total, item) => total + item.product.Price * item.quantity,
    0,
  );

  return (
    <div className="m-5 mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-md md:max-w-3xl">
      <div className="p-8">
        <div className="text-lg font-bold uppercase tracking-wide text-slate-700">
          Cart
        </div>
        {cart.map((item, index) => (
          <CartItemCard
            key={index}
            item={item}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        ))}
        <div className="text-lg font-bold uppercase tracking-wide text-slate-700">
          Total: {total}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: products, error } = api.example.getAll.useQuery();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  const updateQuantity = (itemToUpdate: CartItem, quantity: number) => {
    setCart(
      cart.map((item) =>
        item === itemToUpdate ? { ...itemToUpdate, quantity } : item,
      ),
    );
  };

  if (error) {
    // Handle the error here
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }

  if (!products) {
    // Handle the loading state
    return <div>Loading...</div>;
  }

  // Cast the products data to the desired type
  const typedProducts = products as Product[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-dark to-gray-light">
      {typedProducts.map((product) => (
        <ProductCard key={product.Id} product={product} addToCart={addToCart} />
      ))}
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}
