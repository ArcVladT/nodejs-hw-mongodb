import { Router } from 'express';
import {
  getContactByIdController,
  getContactsContoller,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getContactsContoller);

router.get('/contacts/:contactId', getContactByIdController);

export default router;
