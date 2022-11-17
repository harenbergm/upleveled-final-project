import { NextApiRequest, NextApiResponse } from 'next';
import { createCommentByUserId } from '../../../database/recipecomments';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log(
    'request.body.comment.userAccountId',
    request.body.comment.userAccountId,
  );

  if (request.method === 'POST') {
    // 1. Get the cookie from the request and use it to validate the session
    const session =
      request.cookies.sessionToken &&
      (await getValidSessionByToken(request.cookies.sessionToken));

    if (!session) {
      response
        .status(400)
        .json({ errors: [{ message: 'No valid session token passed' }] });
      return;
    }

    // 2. Get the user from the token
    const user = await getUserBySessionToken(session.token);

    if (!user) {
      response
        .status(400)
        .json({ errors: [{ message: 'Session token not valid' }] });
      return;
    }

    // return the user from the session token
    response.status(200).json({ user: user });
  } else {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });

    // information coming from from createCommentFromApiById();
    const userId = request.body.comment.userAccountId;
    const recipeId = request.body.comment.recipeId;
    const currentDate = request.body.comment.currentDate;
    const content = request.body.comment.content;

    console.log('userId', userId);

    // Check if all the information exist to create the recipe
    if (!(userId && recipeId && currentDate && content)) {
      return response.status(400).json({
        message:
          'property user Id, recipe Id, current Date and/or content missing',
      });
    }

    if (request.method === 'POST') {
      createCommentByUserId(userId, recipeId, content, currentDate);
    }

    if (request.method === 'GET') {
      response
        .status(405)
        .json({ errors: [{ message: 'method not allowed' }] });
    }

    if (request.method === 'PUT') {
      response
        .status(405)
        .json({ errors: [{ message: 'method not allowed' }] });
    }

    if (request.method === 'DELETE') {
      response
        .status(405)
        .json({ errors: [{ message: 'method not allowed' }] });
    }
  }
}
