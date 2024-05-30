"use client";
// components/ContactProfile.tsx

import React from 'react';
import { jsPDF } from 'jspdf';



const ContactProfile: React.FC<{ contact:any; onBack: () => void }> = ({ contact, onBack }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${contact.firstName} ${contact.lastName}`, 10, 10);
    doc.text(`Phone: ${contact.phone}`, 10, 20);
    doc.text(`Email: ${contact.email}`, 10, 30);
    doc.text(`Date: ${contact.dateAdded.split('T')[0]}`, 10, 40);
    doc.text(`Status: ${contact.status}`, 10, 50);
    doc.save(`${contact.firstName}.pdf`);
  };

  return (
    <div className="p-4 border rounded-lg">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded">&larr; Back</button>
      <h2 className="text-2xl font-semibold">{contact.firstName} {contact.lastName}</h2>
      <p className="text-gray-500">Phone: {contact.phone}</p>
      <p className="text-gray-500">Email: {contact.email}</p>
      <p className="text-gray-500">Date: {contact.dateAdded.split('T')[0]}</p>
      <p className="text-gray-500">Status: {contact.status}</p>
      <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Download as PDF</button>
    </div>
  );
};

export default ContactProfile;