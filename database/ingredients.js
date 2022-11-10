import { sql } from './connect';

export default async function getIngredients() {
  const ingredients = await sql`SELECT * FROM ingredients;`;

  return ingredients;
}
