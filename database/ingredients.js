import { sql } from './connect';

export default async function getIngredients() {
  const ingredients = await sql`SELECT * FROM ingredients`;

  return ingredients;
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
