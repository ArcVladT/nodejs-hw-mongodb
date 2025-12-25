import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Bad request!');
  }

  next();
};
