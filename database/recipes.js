import { sql } from './connect';

export async function createRecipe(
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
  RETURNING
    id,
    username
  `;

  return recipe;
}

export async function createRecipeIngredients() {}
