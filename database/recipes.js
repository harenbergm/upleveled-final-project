import { sql } from './connect';

export async function createRecipeByUserid(
  name,
  user_id,
  preparation_time,
  difficulty_id,
  imageurl,
  instruction,
) {
  const recipe = await sql`

  INSERT INTO recipes
    (name, user_id, preparation_time, difficulty_id, imageurl,instruction)
  VALUES
    (${name}, ${user_id}, ${preparation_time}, ${difficulty_id}, ${imageurl}, ${instruction})
  RETURNING *
    `;

  return recipe;
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

export async function createDifficulty(difficulty) {
  const difficulty = await sql`
    INSERT INTO difficulties
      (name)
    VALUES
      (${difficulty})
    RETURNING *
  `;
  return difficulty;
}

export async function getAllRecipes() {
  const allRecipes = await sql`
  SELECT
    recipes.id as recipes_ingredients.recipe_id,
    recipes.name,
    recipes.preparation_time,
    recipes.imageurl,
    recipes.instruction,
    recipes.user_id,
    recipes.difficulty_id
  FROM
    recipes,
    users,
    recipes_ingredients,
    ingredients,
    difficulties
  WHERE
    users.id = recipes.user_id AND
    difficulties.id = recipes.difficulty_id AND --how to display the difficulty name?
    recipes_ingredients.ingredient_id = recipes.id AND
    recipes_ingredients.ingredient_id = ingredients.id AND;
  `;

  return allRecipes;
}
