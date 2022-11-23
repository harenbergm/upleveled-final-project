/**
 * @jest-environment node
 */

import { sql } from '../../database/connect';
import { createCommentByUserId } from '../../database/recipecomments';

test('create comment by user id', async () => {
  const recipeId = 1;
  const userId = 3;
  const content = 'Jest Test Comment';
  const username = 'test123';
  const date = '2022-11-23';

  expect(
    await createCommentByUserId(recipeId, userId, content, username, date),
  ).not.toBe(undefined);

  await sql.end();
});
