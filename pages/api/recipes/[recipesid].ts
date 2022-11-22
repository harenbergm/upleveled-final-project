import { NextApiRequest, NextApiResponse } from 'next';
import { deleteRecipeByRecipeId } from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByValidSessionToken } from '../../../database/users';

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
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'DELETE') {
    const recipeId = request.body?.recipeId;
    console.log('recipeId', recipeId);
    const deletedRecipe = await deleteRecipeByRecipeId(recipeId);

    if (!deletedRecipe) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    return response.status(200).json(deletedRecipe);
  }

  if (request.method === 'POST') {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }

  if (request.method === 'GET') {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
