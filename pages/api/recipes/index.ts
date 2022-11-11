import { NextApiRequest, NextApiResponse } from 'next';
import {
  createDifficulty,
  createRecipeByUserid,
  createRecipeIngredientsByReceipeIdAndIngredientId,
  getAllRecipes,
} from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
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

    // information coming from from createRecipeFromApiById();
    const iD = request.body?.iD;
    const titleSelected = request.body?.titleSelected;
    const preparationTimeSelected = request.body?.preparationTimeSelected;
    const imageURL = request.body?.imageURL;
    const recipeInstructionsSelected = request.body?.recipeInstructionsSelected;

    // information coming from createRecipes_IngredientsFromApi();
    const ingredientsSelected = request.body?.ingredientsSelected;
    // information coming from createDifficultiesFromApi();
    const difficultySelected = request.body?.difficultySelected;

    // Check if all the information exist to create the recipe
    if (
      !(
        iD &&
        titleSelected &&
        preparationTimeSelected &&
        imageURL &&
        recipeInstructionsSelected &&
        ingredientsSelected &&
        difficultySelected
      )
    ) {
      return response.status(400).json({
        message:
          'property Id, Title, Image, Ingredients, preparation time, Difficulty and/or instruction missing',
      });
    }

    const newRecipe = createRecipeByUserid(
      iD,
      titleSelected,
      preparationTimeSelected,
      imageURL,
      recipeInstructionsSelected,
    );
    const newRecipeIngredients =
      createRecipeIngredientsByReceipeIdAndIngredientId(ingredientsSelected);
    const newDifficulty = createDifficulty(difficultySelected);

    if (!(newRecipe || newRecipeIngredients || newDifficulty)) {
      return response
        .status(400)
        .json({ message: 'Properties to create the receipe are missing' });
    }
    // response with the new created user ??
    // return response.status(200).json(newUser); ??

    // const cloudinaryBodyUrl = request.body?.imageURL;
    // console.log('cloudinaryBodyUrl', cloudinaryBodyUrl);
  }

  if (request.method === 'GET') {
    const allRecipes = await getAllRecipes();

    if (!allRecipes) {
      return response.status(500).json({ message: 'Internal Server Error' });
    }
    return response.status(200).json(allRecipes);
  }

  if (request.method === 'PUT') {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }

  if (request.method === 'DELETE') {
    response.status(405).json({ errors: [{ message: 'method not allowed' }] });
  }
}
