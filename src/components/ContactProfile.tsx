// components/ContactProfile.tsx
"use client";
import React from 'react';

interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  // Add other relevant fields
}

const ContactProfile: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div>
      <h2>{contact.name}</h2>
      <p>{contact.role}</p>
      <p>{contact.company}</p>
      {/* Additional details */}
    </div>
  );
};

export default ContactProfile;