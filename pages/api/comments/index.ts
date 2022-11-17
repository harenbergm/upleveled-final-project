import { NextApiRequest, NextApiResponse } from 'next';
import { createCommentByUserId } from '../../../database/recipecomments';
// import { getValidSessionByToken } from '../../../database/sessions';
// import { getUserBySessionToken } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    /* // 1. Get the cookie from the request and use it to validate the session
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
    response.status(405).json({ errors: [{ message: 'method not allowed' }] }); */

    // information coming from from createCommentFromApiById();
    const recipeId = request.body.comment.recipeId;
    const userId = request.body.comment.userAccountId;
    const content = request.body.comment.content;
    const date = request.body.comment.currentDate;
    const username = request.body.comment.username;

    console.log('recipeId', recipeId);
    console.log('userId', userId);
    console.log('content', content);
    console.log('date', date);
    console.log('username', username);

    // Check if all the information exist to create the recipe
    if (!(recipeId && userId && content && username && date)) {
      return response.status(400).json({
        message:
          'property user Id, recipe Id, current Date and/or content missing',
      });
    }

    // create new comment
    const newComment = await createCommentByUserId(
      recipeId,
      userId,
      content,
      username,
      date,
    );
    console.log('newComment', newComment);

    /*  if (request.method === 'GET') {
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
  } */
  }
}
