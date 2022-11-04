import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getUserByValidSessionToken,
  updateUserById,
} from '../../../database/users';

// import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // check if session token exists
  console.log('request.query', request.query);
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  const userId = Number(request.query.profileId);

  // check if the id is a number
  if (!userId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  // check if user exists and has a valid session token
  const user = await getUserByValidSessionToken(request.cookies.sessionToken);

  // check if user exists in the database
  if (!user) {
    return response
      .status(404)
      .json({ message: 'Not a valid username or not a valid session token' });
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const userName = request.body?.userName;
    const eMail = request.body?.eMail;

    // Check if all the information exist to create the user
    if (!(userName && eMail)) {
      return response
        .status(400)
        .json({ message: 'property username or email missing' });
    }

    // TODO: add type checking to the api

    // Create the user using the database util function
    const newUser = await updateUserById(userId, userName, eMail);

    if (!newUser) {
      return response.status(404).json({ message: 'Not a valid Username' });
    }

    // response with the new created user
    return response.status(200).json(newUser);
  }
  return response.status(200).json(user);
}

// prevent the endpoint to be accessed by cross site requests
// const csrfToken = request.body?.csrfToken;

// if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
//   return response.status(401).json({ message: 'csrf_token is not valid' });
// }
