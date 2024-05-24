// components/Navbar.tsx
"use client";
import React, { useState } from 'react';

const Navbar: React.FC<{ onSelectCategory: (category: string) => void }> = ({ onSelectCategory }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <button onClick={() => onSelectCategory('Investors')} className="text-white mx-2">Investors</button>
      <button onClick={() => onSelectCategory('Founders')} className="text-white mx-2">Founders</button>
      <button onClick={() => onSelectCategory('All')} className="text-white mx-2">All</button>
    </nav>
  );
};

export default Navbar;