"use client";
// components/ContactListView.tsx
import React, { useState, useEffect } from 'react';
import ContactProfile from './ContactProfile';
import FilterOptions from './FilterOptions';




const fetchContacts = async (category: any): Promise<any[]> => {
  try {
    const response = await fetch("/api/contacts");
    const data = await response.json();

    const contacts = data.res.contacts.map((contact: any) => {
      if (contact.tags.includes('appointment booked')) {
        return { ...contact, status: 'appointment booked' };
      }
      return { ...contact, status: 'appointment to be booked' };;
    });

    if (category === 'Investors') {
      return contacts.filter((contact: any) => contact.tags.includes('Investors'));
    } else if (category === 'Founders') {
      return contacts.filter((contact: any) => contact.tags.includes('Founders'));
    } else {
      return contacts;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const ContactListView: React.FC<{ category: any }> = ({ category }) => {
  const [view, setView] = useState<string>('list');
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  

  useEffect(() => {
    const getContacts = async () => {
      const contacts = await fetchContacts(category);
      setContacts(contacts);
    };
    getContacts();
  }, [category]);

  // useEffect(() => {
    
  // }, []);

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
                <div className="flex-shrink-0 w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  {/* {contact.firstName } */}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold">{contact.firstName} {contact.lastName}</div>
                  <div className="text-gray-500">{contact.phone}</div>
                  <div className="text-gray-500">{contact.email}</div>
                </div>
                <div className="text-gray-500">{contact.dateAdded.split('T')[0]}</div>
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
                  {/* {contact.firstName} */}
                </div>
                <div className="text-lg font-semibold">{contact.firstName} {contact.lastName}</div>
                <div className="text-gray-500">{contact.phone}</div>
                <div className="text-gray-500">{contact.email}</div>
                <div className="text-gray-500">{contact.dateAdded.split('T')[0]}</div>
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
                  {/* {contact.firstName} */}
                </div>
                <h2 className="text-lg font-semibold">{contact.firstName} {contact.lastName}</h2>
                <p className="text-gray-500">{contact.phone}</p>
                <p className="text-gray-500">{contact.email}</p>
                <p className="text-gray-500">{contact.dateAdded.split('T')[0]}</p>
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

