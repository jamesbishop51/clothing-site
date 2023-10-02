import { api } from "~/utils/api";
import Image from 'next/image'
import { useState } from 'react';

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

function ProductCard({ product }: { product: Product }) {
  const [selectedColour, setSelectedColour] = useState(product.Colours[0]);

  if (!selectedColour) {
    return null; // or some fallback UI
  }

  return (
    <div key={product.Id} className="md:flex">
      <div className="md:flex-shrink-0">
        <Image width={ 200 } height={ 200} className="h-48 w-full object-cover md:w-48" src={selectedColour.Image} alt={selectedColour.Name} />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.Name}</div>
        <select value={selectedColour.Id} onChange={(e) => setSelectedColour(product.Colours.find(colour => colour.Id === Number(e.target.value)))}>
          {product.Colours.map((colour) => (
            <option key={colour.Id} value={colour.Id}>{colour.Name}</option>
          ))}
        </select>
        <p className="mt-2 text-gray-500">{product.Description}</p>
        {selectedColour.Size.map((size) => (
          <button key={size.Id} className="mt-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            {size.Size}
          </button>
        ))}
      </div>
      <div className="p-8 flex items-center justify-between">
        <span className="text-indigo-600 font-bold">{product.Price}</span>
        <button className="px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Add to Cart</button>
      </div>
    </div>
  )
}

export default function Home() {
  const { data: products, error } = api.example.getAll.useQuery();

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
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl m-5">
      {typedProducts.map((product) => (
        <ProductCard key={product.Id} product={product} />
      ))}
    </div>
  )
}
