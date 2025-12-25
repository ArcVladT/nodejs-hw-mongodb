import { Router } from 'express';
import {
  createContactController,
  deleteContactContoller,
  getContactByIdController,
  getContactsContoller,
  updateContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactValidationSchema,
  updateContactValidationSchema,
} from '../../validation/contact.js';

const router = Router();

router.get('/contacts', getContactsContoller);

router.get('/contacts/:contactId', isValidId, getContactByIdController);

router.post(
  '/contacts',
  validateBody(createContactValidationSchema),
  createContactController,
);

router.put(
  '/contacts/:contactId',
  validateBody(createContactValidationSchema),
  isValidId,
  upsertContactController,
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactValidationSchema),
  isValidId,
  updateContactController,
);

router.delete('/contacts/:contactId', isValidId, deleteContactContoller);

export default router;
