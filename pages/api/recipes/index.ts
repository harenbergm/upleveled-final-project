import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import postgres from 'postgres';
import {
  createInsertIntoRecipesIngredientsIngredientsIdsAndRecipeId,
  createRecipeByUserId,
  getAllRecipesWithoutDuplicatesRecipeId,
  getLastRecipeIdByUserId,
} from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

// type Props = {
//   user: User;
// };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    /*  // 1. Get the cookie from the request and use it to validate the session
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

    // information coming from from createRecipeFromApiById();

    const recipe = request.body.recipe;
    const recipeIngredients = request.body.recipeIngredients;
    const userId = recipe.userAccountId;
    const titleSelected = recipe.titleSelected;
    const preparationTimeSelected = recipe.preparationTimeSelected;
    const imageURL = recipe.imageURL;
    const recipeInstructionsSelected = recipe.recipeInstructionsSelected;
    const difficultySelected = recipe.difficultyId;
    const ingredientsSelected = recipeIngredients.selectedIngredients;

    // Check if all the information exist to create the recipe
    if (
      !(
        titleSelected &&
        userId &&
        preparationTimeSelected &&
        difficultySelected &&
        imageURL &&
        recipeInstructionsSelected &&
        ingredientsSelected
      )
    ) {
      return response.status(400).json({
        message:
          'property Id, Title, Image, Ingredients, preparation time, Difficulty and/or instruction missing',
      });
    }

    // create recipe

    const createNewRecipe = createRecipeByUserId(
      titleSelected,
      userId,
      preparationTimeSelected,
      difficultySelected,
      imageURL,
      recipeInstructionsSelected,
    );

    // get last created recipe id by user id
    const getRecipeIdFromCreatedRecipe = await getLastRecipeIdByUserId(userId);

    // take recipe id and add ingredients
    const newRecipeIngredientsRecipeId =
      await createInsertIntoRecipesIngredientsIngredientsIdsAndRecipeId(
        getRecipeIdFromCreatedRecipe?.id,
        ingredientsSelected,
      );

    if (
      !(
        createNewRecipe ||
        getRecipeIdFromCreatedRecipe ||
        newRecipeIngredientsRecipeId
      )
    ) {
      return response
        .status(400)
        .json({ message: 'Properties to create the receipe are missing' });
    }

    /*     if (request.method === 'GET') {
      const allRecipes = await getAllRecipesWithoutDuplicatesRecipeId();

      if (!allRecipes) {
        return response.status(500).json({ message: 'Internal Server Error' });
      }
      return response.status(200).json(allRecipes);
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
    } */
  }
}
