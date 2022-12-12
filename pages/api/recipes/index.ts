import { NextApiRequest, NextApiResponse } from 'next';
import {
  createInsertIntoRecipesIngredientsIngredientsIdsAndRecipeId,
  createRecipeByUserId,
  getAllRecipesWithoutDuplicatesRecipeId,
  getLastRecipeIdByUserId,
} from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserByValidSessionToken } from '../../../database/users';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    // 1. check if session token exists
    const session =
      request.cookies.sessionToken &&
      (await getValidSessionByToken(request.cookies.sessionToken));

    if (!session) {
      response
        .status(400)
        .json({ errors: [{ message: 'No valid session token passed' }] });
      return;
    }

    // 2. check if user exists and has a valid session token
    const user = await getUserByValidSessionToken(request.cookies.sessionToken);

    // 3. check if user exists in the database
    if (!user) {
      return response.status(404).json({ message: 'User does not exist' });
    }

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

    // console.log('recipe', recipe);
    console.log('recipeIngredients', recipeIngredients);
    // console.log('userId', userId);
    // console.log('titleSelected', titleSelected);
    // console.log('preparationTimeSelected', preparationTimeSelected);
    // console.log('imageURL', imageURL);
    // console.log('recipeInstructionsSelected', recipeInstructionsSelected);
    // console.log('difficultySelected', difficultySelected);
    // console.log('ingredientsSelected', ingredientsSelected);

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
    )
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
            'property title, user Id, preparation time, difficulty, imageUrl, recipe instructions and/or ingedients missing',
        });
      }

    // create recipe

    const createNewRecipe = await createRecipeByUserId(
      titleSelected,
      userId,
      preparationTimeSelected,
      difficultySelected,
      imageURL,
      recipeInstructionsSelected,
    );

    // console.log('createNewRecipe', createNewRecipe);

    // get last created recipe id by user id
    const getRecipeIdFromCreatedRecipe = await getLastRecipeIdByUserId(userId);
    // console.log('getRecipeIdFromCreatedRecipe', getRecipeIdFromCreatedRecipe);

    // take recipe id and add ingredients
    const newRecipeIngredientsRecipeId =
      await createInsertIntoRecipesIngredientsIngredientsIdsAndRecipeId(
        getRecipeIdFromCreatedRecipe?.id,
        ingredientsSelected,
      );

    // console.log('newRecipeIngredientsRecipeId', newRecipeIngredientsRecipeId);

    // Check if all the information exist to create the recipe
    if (
      !(
        createNewRecipe ||
        getRecipeIdFromCreatedRecipe ||
        newRecipeIngredientsRecipeId
      )
    )
      if (
        !(
          createNewRecipe ||
          getRecipeIdFromCreatedRecipe ||
          newRecipeIngredientsRecipeId
        )
      ) {
        return response
          .status(405)
          .json({ errors: [{ message: 'method not allowed' }] });
      }
    // return the user from the session token
    return response
      .status(200)
      .json([
        { createNewRecipe: createNewRecipe },
        { newRecipeIngredientsRecipeId: newRecipeIngredientsRecipeId },
      ]);
  }

  if (request.method === 'GET') {
    const allRecipes = await getAllRecipesWithoutDuplicatesRecipeId();

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
