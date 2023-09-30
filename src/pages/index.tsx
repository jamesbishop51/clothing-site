import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  // Fetch the products and their variants
  const products = api.example.getAll.useQuery();

  const ello = api.test.hello.useQuery({ text: "World"});

  return (
    <>
      <Head>
        <title>Product Page</title>
        <meta name="description" content="Product page for clothing website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* Display the products and their variants */}
          {products.data?.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm">{product.description}</p>
              {product.variants.map((variant) => (
                <div key={variant.color} className="border-t pt-4">
                  <p>Size: {variant.size}</p>
                  <p>Color: {variant.color}</p>
                  <p>Stock: {variant.stock}</p>
                  <img src={variant.image} alt={`${product.name} ${variant.size} ${variant.color}`} className="my-4" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <p className="text-sm text-white">{ello.data ? ello.data.greeting : 'loading'}</p>
        </div>
      </main>
    </>
  );
}
