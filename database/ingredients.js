import { sql } from './connect';

export default async function getIngredientsByRecipeId(recipeId) {
  const ingredients = await sql`
  SELECT *
  FROM ingredients
  Where id = ${recipeId}
  `;

  return ingredients;
}
