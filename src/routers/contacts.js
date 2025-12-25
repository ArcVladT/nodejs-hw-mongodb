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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', getContactsContoller);

router.get('/:contactId', isValidId, getContactByIdController);

router.post(
  '/',
  validateBody(createContactValidationSchema),
  createContactController,
);

router.put(
  '/:contactId',
  validateBody(createContactValidationSchema),
  isValidId,
  upsertContactController,
);

router.patch(
  '/:contactId',
  validateBody(updateContactValidationSchema),
  isValidId,
  updateContactController,
);

router.delete('/:contactId', isValidId, deleteContactContoller);

export default router;
