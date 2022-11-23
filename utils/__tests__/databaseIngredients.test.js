/**
 * @jest-environment node
 */

import { sql } from '../../database/connect';
import {
  getIngredientsByRecipeId,
  getLastRecipeIdByUserId,
} from '../../database/ingredients';

test('get ingredients by recipeId and get recipe by userId', async () => {
  const recipeid = 1;
  const testUserId = 2;

  expect(await getIngredientsByRecipeId(recipeid)).not.toBe(undefined);

  // close connection to the database
  await sql.end();
});
