"use client";
// components/FilterOptions.tsx
import React, { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  // Add other relevant fields
}

const applyFilters = (contacts: Contact[], filters: { [key: string]: string }): Contact[] => {
  // Simulate filtering contacts based on filters
  return contacts.filter(contact => {
    // Apply filtering logic here
    return true;
  });
};

const FilterOptions: React.FC = () => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'John Doe', role: 'Investor', company: 'Company A' },
    { id: '2', name: 'Jane Smith', role: 'Founder', company: 'Company B' },
    // Add more sample data
  ]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredContacts = applyFilters(contacts, filters);

  return (
    <div className="flex space-x-2">
      <input onChange={(e) => handleFilterChange('location', e.target.value)} placeholder="Location" className="p-2 border rounded" />
      <input onChange={(e) => handleFilterChange('industry', e.target.value)} placeholder="Industry" className="p-2 border rounded" />
      {/* Additional filters */}
    </div>
  );
};

export default FilterOptions;