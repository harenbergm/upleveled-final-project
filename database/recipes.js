import { sql } from './connect';

export async function createRecipeByUserid(
  name,
  userId,
  preparationTime,
  difficultyId,
  imageurl,
  instruction,
) {
  const recipe = await sql`

  INSERT INTO recipes
    (name, user_id, preparation_time, difficulty_id, imageurl,instruction)
  VALUES
    (${name}, ${userId}, ${preparationTime}, ${difficultyId}, ${imageurl}, ${instruction})
  RETURNING *
    `;

  return recipe;
}

export async function getRecipeId(id) {
  const recipeId = await sql`
SELECT id FROM recipes

WHERE user_id = ${id}

`;
  return recipeId;
}

export async function createRecipeIngredientsByReceipeIdAndIngredientId(
  recipeId,
  ingredientId,
) {
  const Ingredients = await sql`
  INSERT INTO recipes_ingredients
    (recipe_id, ingredient_id)
  VALUES
    (${recipeId}, ${ingredientId})
  RETURNING *
`;
  return Ingredients;
}

// export async function createDifficulty(difficulty) {
//   const difficulty = await sql`
//     INSERT INTO difficulties
//       (name)
//     VALUES
//       (${difficulty})
//     RETURNING *
//   `;
//   return difficulty;
// }

export async function getAllRecipes() {
  const allRecipes = await sql`
  SELECT
    recipes.id as recipes_ingredients,
    recipes.name,
    recipes.preparation_time,
    recipes.imageurl,
    recipes.instruction,
    recipes.user_id,
    recipes.difficulty_id,
    ingredients.name as ingredients_name,
    difficulties.name as difficulty_name
  FROM
    recipes,
    users,
    recipes_ingredients,
    ingredients,
    difficulties
  WHERE
    users.id = recipes.user_id AND
    difficulties.id = recipes.difficulty_id AND
    recipes_ingredients.ingredient_id = recipes.id AND
    recipes_ingredients.ingredient_id = ingredients.id ;
  `;

  return allRecipes;
}
