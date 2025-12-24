import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const getContacts = async () => {
  const contacts = await ContactsCollection.find();

  return contacts;
};

export const getContactById = async (contactId) => {
  console.log('foejfeojfj', contactId);
  const contact = await ContactsCollection.findById(contactId);

  if (!contact) {
    createHttpError(404, 'Contact not found');
  }

  return contact;
};
