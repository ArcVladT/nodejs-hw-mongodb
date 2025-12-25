import { ContactsCollection } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalItems, items] = await Promise.all([
    contactsQuery.clone().countDocuments(),
    contactsQuery
      .clone()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return {
    data: items,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId: userId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete({
    _id: contactId,
  });

  return contact;
};
