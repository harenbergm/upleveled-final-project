import { sql } from './connect';

export async function createCommentByUserId(
  userId,
  recipeId,
  content,
  currentDate,
) {
  const comment = await sql`

  INSERT INTO comments
    (recipe_id, user_id, content, date)

  VALUES
  (${recipeId}, ${userId}, ${content}, ${currentDate})

  RETURNING *
    `;

  return comment;
}

export async function getIngredientsByRecipeId(recipeId) {
  const ingredients = await sql`
  SELECT
    ingredients.name

  FROM
    recipes_ingredients,
    ingredients

  Where
    recipes_ingredients.ingredient_id = ingredients.id AND
    recipe_id = ${recipeId}
  `;

  return ingredients;
}
