import { sql } from './connect';

export async function createCommentByUserId(
  recipeId,
  userId,
  content,
  username,
  date,
) {
  const comment = await sql`
  INSERT INTO comments
    (recipe_id, user_id, content, user_name, date)
  VALUES
  (${recipeId}, ${userId}, ${content}, ${username}, ${date})
  RETURNING *
    `;
  return comment;
}

export async function getCommentByRecipeId(recipeId) {
  const comment = await sql`
  SELECT
  *
  FROM
    comments
  WHERE
  (recipe_id = ${recipeId})
    `;
  return comment;
}

// export async function getIngredientsByRecipeId(recipeId) {
//   const ingredients = await sql`
//   SELECT
//     ingredients.name
//   FROM
//     recipes_ingredients,
//     ingredients
//   Where
//     recipes_ingredients.ingredient_id = ingredients.id AND
//     recipe_id = ${recipeId}
//   `;
//   return ingredients;
// }
