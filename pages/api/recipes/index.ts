import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import {
  createRecipeByUserid as createRecipeByUserId,
  createRecipeIngredientsByReceipeIdAndIngredientId,
  createRecipeIngredientsByReceipeIdAndIngredientIdNEW,
  getAllRecipes,
  getLastRecipeId,
} from '../../../database/recipes';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';

// type Props = {
//   user: User;
// };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
  // props: Props,
) {
  // const userId = props.user.id;

  console.log('request.body', request.body);

  // if (request.method === 'POST') {
  //   // 1. Get the cookie from the request and use it to validate the session
  //   const session =
  //     request.cookies.sessionToken &&
  //     (await getValidSessionByToken(request.cookies.sessionToken));

  //   if (!session) {
  //     response
  //       .status(400)
  //       .json({ errors: [{ message: 'No valid session token passed' }] });
  //     return;
  //   }

  //   // 2. Get the user from the token
  //   const user = await getUserBySessionToken(session.token);

  //   if (!user) {
  //     response
  //       .status(400)
  //       .json({ errors: [{ message: 'Session token not valid' }] });
  //     return;
  //   }

  //   // return the user from the session token
  //   response.status(200).json({ user: user });
  // } else {
  //   response.status(405).json({ errors: [{ message: 'method not allowed' }] });

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

  // console.log('request.body', request.body);

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

  // run getRecipeId and pass userid
  // run afterwards createRecipeIngredientsByReceipeIdAndIngredientId

  const createNewRecipe = createRecipeByUserId(
    titleSelected,
    userId,
    preparationTimeSelected,
    difficultySelected,
    imageURL,
    recipeInstructionsSelected,
  );
  const getRecipeIdFromCreatedRecipe = await getLastRecipeId(userId);
  console.log('getRecipeIdFromCreatedRecipe', getRecipeIdFromCreatedRecipe);
  const newRecipeIngredients =
    createRecipeIngredientsByReceipeIdAndIngredientIdNEW(
      getRecipeIdFromCreatedRecipe,
      userId,
    );

  if (
    !(createNewRecipe || getRecipeIdFromCreatedRecipe || newRecipeIngredients)
  ) {
    return response
      .status(400)
      .json({ message: 'Properties to create the receipe are missing' });
  }

  //   // response with the new created user ??
  //   // return response.status(200).json(newUser); ??

  //   // const cloudinaryBodyUrl = request.body?.imageURL;
  //   // console.log('cloudinaryBodyUrl', cloudinaryBodyUrl);
}

// if (request.method === 'GET') {
//   const allRecipes = await getAllRecipes();

//   if (!allRecipes) {
//     return response.status(500).json({ message: 'Internal Server Error' });
//   }
//   return response.status(200).json(allRecipes);
// }

// if (request.method === 'PUT') {
//   response.status(405).json({ errors: [{ message: 'method not allowed' }] });
// }

// if (request.method === 'DELETE') {
//   response.status(405).json({ errors: [{ message: 'method not allowed' }] });
// }
// }
