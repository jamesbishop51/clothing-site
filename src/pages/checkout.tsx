import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/cartStore";
import Image from "next/image";
import { removeFromCart, updateQuantity, clearCart } from "../utils/cartSlice";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const cart = useSelector((state: RootState) => state.cart);

  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const { address } = shippingAddress;

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleRemoveFromCart = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    dispatch(updateQuantity({ indexToUpdate: index, quantity }));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.Price * item.quantity,
    0,
  );
  const shipping = 6;

  const total = subtotal + shipping;

  const isCartEmpty = cart.length === 0;
  const isEmailValid = email.trim() !== "";

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Event handler to capture the email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    if (formRef.current) {
      // Access form data using the formRef
      const formData = new FormData(formRef.current);

      // Log the email and shipping info

      const data = {
        total,
        cart,
        email: formData.get("email-address"),
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        postalCode: formData.get("postalCode"),
      };

      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Email sending failed");
        }

        dispatch(clearCart());
        router.push("/");

        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white">
      <div
        className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-indigo-900 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <ul
              role="list"
              className="divide-y divide-white divide-opacity-10 text-sm font-medium"
            >
              {cart.map((item: CartItem, index) => (
                <li key={index} className="flex items-start space-x-5 py-6">
                  <Image
                    width={500}
                    height={500}
                    src={item.colour.Image}
                    alt={item.colour.Name}
                    className="h-28 w-28 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{item.product.Name}</h3>
                    <p className="text-white">Size: {item.size.Size}</p>
                    <p className="text-white">Colour: {item.colour.Name}</p>
                    <div>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(index, Number(e.target.value))
                        }
                        className="mr-2 w-16 rounded-md border text-center"
                      />
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="rounded-md bg-red-500 px-2 py-1 text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>€{subtotal.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd>€{shipping.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                <dt className="text-base">Total</dt>
                <dd className="text-base">€{total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            shipping details
          </h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
              <div>
                <h3
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Contact information
                </h3>

                <div className="mt-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
                <div className="mt-6 sm:flex">
                  <div className="w-full sm:w-1/2 sm:pr-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2 sm:pl-2">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Shipping address
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={address}
                        onChange={handleShippingAddressChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        autoComplete="state"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        autoComplete="postalCode"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                {isEmailValid && !isCartEmpty && address ? (
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm Order
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-md border border-gray-300 bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default Checkout;
