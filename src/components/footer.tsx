// components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-semibold">Contact Information</h3>
          <p>Call Today For Assistance</p>
          <p>0873948294</p>
          <p>Alternatively email us: wildweststitchery@gmail.com</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Store Information</h3>
          <p>WildWest Stitchery</p>
          <p>Swinford, Co. Mayo</p>
          <p>0873948294</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
