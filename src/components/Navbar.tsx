// components/Navbar.tsx
"use client";
import React, { useState } from 'react';

const Navbar: React.FC<{ onSelectCategory: (category: string) => void }> = ({ onSelectCategory }) => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-center space-x-8">
      <button onClick={() => onSelectCategory('Investors')} className="text-white hover:underline hover:text-blue-300">Investor</button>
      <button onClick={() => onSelectCategory('Founders')} className="text-white hover:underline hover:text-blue-300">Founder</button>
      <button onClick={() => onSelectCategory('All')} className="text-white hover:underline hover:text-blue-300">All</button>
    </nav>
  );
};

export default Navbar;