import { sql } from './connect';

export async function createRecipeByUserId(
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

export async function getLastRecipeIdByUserId(id) {
  const recipeId = await sql`
SELECT id FROM recipes

WHERE user_id = ${id}

ORDER BY recipes.id DESC

LIMIT 1

`;
  return recipeId[0];
}

export async function createInsertIntoRecipesIngredientsIngredientsIdsAndRecipeId(
  recipeId,
  ingredientIds,
) {
  ingredientIds.forEach(async (ingredientId) => {
    await sql`

    INSERT INTO recipes_ingredients
      ( recipe_id, ingredient_id)
    VALUES
      (${recipeId}, ${ingredientId})

    RETURNING *
  `;
    return ingredientId;
  });
}

// // Insert specializations
// specializationIds.forEach(async (specializationId) => {
//   await sql`
//   INSERT INTO schools_specializations
//    (school_id, specialization_id)
//   VALUES
//    (${school!.id}, ${specializationId})
// `;
// });

// export async function createInsertIntoRecipesIngredientsIngredientsIdsAndRecipeId(
//   recipeId,
//   ingredientIds,
// ) {
//   console.log('recipeId', recipeId);
//   for (const ingredientId of ingredientIds) {
//     const ingredients = await sql`

//     INSERT INTO recipes_ingredients
//       ( recipe_id, ingredient_id)
//     VALUES
//       (${recipeId}, ${ingredientId})

//     RETURNING *
//   `;
//     return ingredients;
//   }
// }

export async function getAllRecipes() {
  const allRecipes = await sql`
  SELECT
    recipes.id,
    recipes.name,
    recipes.preparation_time,
    recipes.imageurl,
    recipes.instruction,
    ingredients.name,
    recipes_ingredients.ingredient_id as ingredient_id,
    recipes.difficulty_id,
    difficulties.name as difficulty_name
  FROM
    recipes,
    recipes_ingredients,
    ingredients,
    difficulties
  WHERE
    recipes.id = recipes_ingredients.recipe_id AND
     recipes_ingredients.ingredient_id = ingredients.id AND
     recipes.difficulty_id = difficulties.id
  `;

  return allRecipes;
}

// export async function getAllRecipes() {
//   const allRecipes = await sql`
//   SELECT
//     recipes.id as recipes_ingredients,
//     recipes.name,
//     recipes.preparation_time,
//     recipes.imageurl,
//     recipes.instruction,
//     recipes.user_id,
//     recipes.difficulty_id,
//     ingredients.name as ingredients_name,
//     difficulties.name as difficulty_name
//   FROM
//     recipes,
//     users,
//     recipes_ingredients,
//     ingredients,
//     difficulties
//   WHERE
//     users.id = recipes.user_id AND
//     difficulties.id = recipes.difficulty_id AND
//     recipes_ingredients.ingredient_id = recipes.id AND
//     recipes_ingredients.ingredient_id = ingredients.id ;
//   `;

//   return allRecipes;
// }
