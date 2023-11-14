import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 z-50 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-semibold">WildWest Stitchery</h3>
          <p>Address: Swinford, Co. Mayo, Ireland</p>
          <p>Mobile: 087 394 8294</p>
          <p>Email: wildweststitchery@gmail.com</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-semibold">J&J Game Dealing</h3>
          <p>Address: Castlebar, Co. Mayo, Ireland</p>
          <p>Mobile: 087 397 9855</p>
          <p>Email: jjgamedealing@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
