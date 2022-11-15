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

export async function getLastRecipeId(id) {
  const recipeId = await sql`
SELECT id FROM recipes

WHERE user_id = ${id}

ORDER BY recipes.id DESC

LIMIT 1

`;
  return recipeId;
}

export async function createRecipeIngredientsByReceipeIdAndIngredientId(
  recipeId,
  ingredientId,
) {
  const ingredients = await sql`
  INSERT INTO recipes_ingredients
    (recipe_id, ingredient_id)
  VALUES
    (${recipeId}, ${ingredientId})
  RETURNING *
`;
  return ingredients;
}

// export async function createRecipeIngredientsByReceipeIdAndIngredientId(
//   recipeIds,
//   ingredientIds,
// ) {
//   for (const recipeId of recipeIds) {
//     await sql`
//   INSERT INTO recipes_ingredients
//     (recipe_id)
//   VALUES
//     (${recipeId})
//   -- FROM
//   --   recipes
//   -- WHERE
//   --   (recipes.id = ${recipeId})
// `;
//   }

//   for (const ingredientId of ingredientIds) {
//     await sql`
//   INSERT INTO recipes_ingredients
//     (ingredient_id)
//   VALUES
//     (${ingredientId})
//   WHERE
//     recipe_id = ${recipeId}

// `;
//     // return ingredients;
//     // return ingredients;
//   }
// }

export async function createRecipeIngredientsByReceipeIdAndIngredientId(
  recipeIds,
  ingredientIds,
) {
  for (const recipeId of recipeIds) {
    await sql`
  INSERT INTO recipes_ingredients
    (recipe_id)
  VALUES
    (${recipeId})
    RETURNING *
`;
    return recipeId;
  }

  for (const ingredientId of ingredientIds) {
    await sql`
  INSERT INTO recipes_ingredients
    (ingredient_id)
  VALUES
    (${ingredientId})
  WHERE
    recipe_id = ${recipeId}
    RETURNING *
`;
    return ingredientId;
  }
}

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
