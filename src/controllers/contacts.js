import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsContoller = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = await req.params;

  const contact = await updateContact(contactId, req.body, { upsert: true });

  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  const status = contact.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const { contactId } = await req.params;

  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully upserted a contact!',
    data: contact,
  });
};

export const deleteContactContoller = async (req, res, next) => {
  const { contactId } = req.params;

  console.log('1', contactId);

  const contact = await deleteContact(contactId);

  console.log('1', contact);

  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.status(204).json();
};
