// components/Layout.tsx
"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
import ContactListView from './ContactListView';

const Layout: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <div>
      <Navbar onSelectCategory={setSelectedCategory} />
      <main className="p-4 h-screen">
        <ContactListView category={selectedCategory} />
      </main>
    </div>
  );
};

export default Layout;