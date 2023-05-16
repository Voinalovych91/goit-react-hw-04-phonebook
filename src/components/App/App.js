
import { GlobalStyle } from 'GlobalStyle';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { Container, PhonebookTitle, ContactsTitle } from './App.styled';
import { useState } from 'react';
import { useEffect } from 'react';

const LS_CONTACTS_KEY = 'contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => { 
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(LS_CONTACTS_KEY)) ?? initialContacts
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(LS_CONTACTS_KEY));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(LS_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);
  const addContact = newContact => {
    const names = contacts.map(item => item.name);

    if (
      names.some(name => name.toLowerCase() === newContact.name.toLowerCase())
    ) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      setContacts([...contacts, newContact]);
        }
  };
  const deleteContact = contactId => {
    setContacts(prevContacts => 
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };
  const filterContacts = value => {
    setFilter(value);
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
    || contact.number.includes(filter)
    );
  return (
      <Container>
        <GlobalStyle></GlobalStyle>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm onSave={addContact} />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter
          filter={filter}
          filterContacts={filterContacts}
        />
        <ContactList onDelete={deleteContact} items={filteredContacts} />
      </Container>
    );
};