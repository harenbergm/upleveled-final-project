import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getUserByValidSessionToken,
  updateUserByUsername,
} from '../../../database/users';

// import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  const user = await getUserByValidSessionToken(request.cookies.sessionToken);

  // check if user exists on the database
  if (!user) {
    return response
      .status(404)
      .json({ message: 'Not a valid Id or not a valid session token' });
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const firstName = request.body?.firstName;
    const accessory = request.body?.accessory;
    const type = request.body?.type;

    // Check if all the information exist to create the user
    if (!(firstName && accessory && type)) {
      return response
        .status(400)
        .json({ message: 'property firstName, accessory or type missing' });
    }

    // TODO: add type checking to the api

    // Create the animal using the database util function
    const newUser = await updateUserByUsername(username, firstName);

    if (!newUser) {
      return response.status(404).json({ message: 'Not a valid Username' });
    }

    // response with the new created animal
    return response.status(200).json(newUser);
  }
  return response.status(200).json(user);
}

// prevent the endpoint to be accessed by cross site requests
// const csrfToken = request.body?.csrfToken;

// if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
//   return response.status(401).json({ message: 'csrf_token is not valid' });
// }
