// components/ContactListView.tsx
"use client";
import React, { useState, useEffect } from 'react';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  // Add other relevant fields
}

const fetchContacts = (category: string): Contact[] => {
  // Simulate fetching contacts based on category
  return [
    { id: '1', name: 'John Doe', role: 'Investor', company: 'Company A' },
    { id: '2', name: 'Jane Smith', role: 'Founder', company: 'Company B' },
    // Add more sample data
  ];
};

const ContactListView: React.FC<{ category: any }> = ({ category }) => {
  const [view, setView] = useState<string>('list');
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(fetchContacts(category));
  }, [category]);

  return (
    <div>
      <div>
        <button onClick={() => setView('list')}>List</button>
        <button onClick={() => setView('grid')}>Grid</button>
        <button onClick={() => setView('card')}>Card</button>
      </div>
      <div>
        {view === 'list' && (
          <ul>
            {contacts.map(contact => (
              <li key={contact.id}>{contact.name} - {contact.role} at {contact.company}</li>
            ))}
          </ul>
        )}
        {view === 'grid' && (
          <div className="grid grid-cols-3 gap-4">
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 border">
                {contact.name} - {contact.role} at {contact.company}
              </div>
            ))}
          </div>
        )}
        {view === 'card' && (
          <div>
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 border">
                <h2>{contact.name}</h2>
                <p>{contact.role}</p>
                <p>{contact.company}</p>
                {/* Add other details */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactListView;