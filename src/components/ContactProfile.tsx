"use client";
// components/ContactProfile.tsx

import React from 'react';
import { jsPDF } from 'jspdf';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: string;
}

const ContactProfile: React.FC<{ contact: Contact; onBack: () => void }> = ({ contact, onBack }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${contact.name}`, 10, 10);
    doc.text(`Phone: ${contact.phone}`, 10, 20);
    doc.text(`Email: ${contact.email}`, 10, 30);
    doc.text(`Date: ${contact.date}`, 10, 40);
    doc.text(`Status: ${contact.status}`, 10, 50);
    doc.save(`${contact.name}.pdf`);
  };

  return (
    <div className="p-4 border rounded-lg">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded">&larr; Back</button>
      <h2 className="text-2xl font-semibold">{contact.name}</h2>
      <p className="text-gray-500">Phone: {contact.phone}</p>
      <p className="text-gray-500">Email: {contact.email}</p>
      <p className="text-gray-500">Date: {contact.date}</p>
      <p className="text-gray-500">Status: {contact.status}</p>
      <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Download as PDF</button>
    </div>
  );
};

export default ContactProfile;