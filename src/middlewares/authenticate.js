import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (!bearer || !token) {
    next(createHttpError(401, 'Auth header should be type of bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({
    accessToken: token,
  });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  if (Date.now() > new Date(session.accessTokenValidUntil)) {
    next(createHttpError(401, 'Token is expired'));
    return;
  }

  const user = await UsersCollection.findOne({
    _id: session.userId,
  });

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
