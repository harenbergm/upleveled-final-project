/**
 * @jest-environment node
 */

import { sql } from '../../database/connect';
import {
  createUser,
  deleteUserById,
  getUserByUsername,
} from '../../database/users';

test('get, create and delete a user', async () => {
  const username = 'test_user';
  const password = 'test123';
  const email = 'mail@mail.de';

  expect(await getUserByUsername(username)).toBe(undefined);

  const testUser = await createUser(username, password, email);

  const deletedUser = deleteUserById(testUser.id);
  expect(deletedUser.not.toBe(undefined));

  await sql.end();
});
