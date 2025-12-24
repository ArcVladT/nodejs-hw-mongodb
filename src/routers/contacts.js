import { Router } from 'express';
import {
  createContactController,
  deleteContactContoller,
  getContactByIdController,
  getContactsContoller,
  updateContactController,
  upsertContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsContoller);

router.get('/contacts/:contactId', getContactByIdController);

router.post('/contacts', createContactController);

router.put('/contacts/:contactId', upsertContactController);

router.patch('/contacts/:contactId', updateContactController);

router.delete('/contacts/:contactId', deleteContactContoller);

export default router;
