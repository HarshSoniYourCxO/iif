"use client";
// components/ContactListView.tsx
import React, { useState, useEffect } from 'react';
import ContactProfile from './ContactProfile';
import FilterOptions from './FilterOptions';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: string;
}

const fetchContacts = (category: any): any => {
  // Simulate fetching contacts based on category
  if(category==='Investors'){
    return [
        { id: '1', name: 'Kartavya Thapa', phone: '095936 50063', email: 'thirdtest@gmail.com', date: 'Apr 25, 2024 12:47 AM (PDT)', status: 'appointment booked' },
        // Add more sample data
      ];

  }else if(category==='Founders'){
    return [
      
        { id: '2', name: 'Amidas Calendarcontact', phone: '080016 85128', email: 'apitestuser@gmail.com', date: 'Apr 24, 2024 08:35 PM (PDT)', status: 'appointment booked' },
        { id: '3', name: 'Harsh Soni', phone: '083193 15610', email: 'harsh.soni2020@vitbhopal.ac.in', date: 'Apr 23, 2024 11:48 AM (PDT)', status: 'appointment booked' },
        // Add more sample data
      ];
  }
  else{
    return [
        { id: '1', name: 'Kartavya Thapa', phone: '095936 50063', email: 'thirdtest@gmail.com', date: 'Apr 25, 2024 12:47 AM (PDT)', status: 'appointment booked' },
        { id: '2', name: 'Amidas Calendarcontact', phone: '080016 85128', email: 'apitestuser@gmail.com', date: 'Apr 24, 2024 08:35 PM (PDT)', status: 'appointment booked' },
        { id: '3', name: 'Harsh Soni', phone: '083193 15610', email: 'harsh.soni2020@vitbhopal.ac.in', date: 'Apr 23, 2024 11:48 AM (PDT)', status: 'appointment booked' },
        // Add more sample data
      ];
  }

  
};

const ContactListView: React.FC<{ category: any }> = ({ category }) => {
  const [view, setView] = useState<string>('list');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    setContacts(fetchContacts(category));
  }, [category]);

  useEffect(() => {
    try {
      fetch("/api/contacts")
        .then((res) => res.json())
        .then((data:any) => {
          console.log("data ",data)
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (selectedContact) {
    return <ContactProfile contact={selectedContact} onBack={() => setSelectedContact(null)} />;
  }

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setView('list')} className={`bg-gray-900 w-[5vw] ${view==='list'?'bg-blue-300 border-gray-900 text-blue-900':'bg-gray-900 text-white'} p-2 rounded-r-[20px] rounded-l-[20px] hover:bg-gray-300 hover:text-blue-900`}>List</button>
        <button onClick={() => setView('grid')} className={`bg-gray-900 w-[5vw] ${view==='grid'?'bg-blue-300 border-gray-900 text-blue-900':'bg-gray-900 text-white'} p-2 rounded-r-[20px] rounded-l-[20px] hover:bg-gray-300 hover:text-blue-900`}>Grid</button>
        <button onClick={() => setView('card')} className={`bg-gray-900 w-[5vw] ${view==='card'?'bg-blue-300 border-gray-900  text-blue-900':'bg-gray-900 text-white'} p-2 rounded-r-[20px] rounded-l-[20px] hover:bg-gray-300 hover:text-blue-900`}>Card</button>
      </div>
      
      <div>
        {view === 'list' && (
          <ul className="border rounded-lg">
            {contacts.map(contact => (
              <li key={contact.id} className="flex items-center p-4 border-b bg-white rounded-lg mb-5 cursor-pointer" onClick={() => setSelectedContact(contact)}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{contact.name}</div>
                  <div className="text-gray-500">{contact.phone}</div>
                  <div className="text-gray-500">{contact.email}</div>
                </div>
                <div className="text-gray-500">{contact.date}</div>
                <div className="ml-4">
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{contact.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {view === 'grid' && (
          <div className="grid grid-cols-3 gap-4">
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 border  bg-white rounded-lg cursor-pointer" onClick={() => setSelectedContact(contact)}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-lg font-semibold">{contact.name}</div>
                <div className="text-gray-500">{contact.phone}</div>
                <div className="text-gray-500">{contact.email}</div>
                <div className="text-gray-500">{contact.date}</div>
                <div className="mt-2">
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{contact.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {view === 'card' && (
          <div>
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 border bg-white rounded-lg mb-4 cursor-pointer" onClick={() => setSelectedContact(contact)}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-lg font-semibold">{contact.name}</h2>
                <p className="text-gray-500">{contact.phone}</p>
                <p className="text-gray-500">{contact.email}</p>
                <p className="text-gray-500">{contact.date}</p>
                <div className="mt-2">
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{contact.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactListView;

