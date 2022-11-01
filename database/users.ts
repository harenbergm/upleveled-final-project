// !! EMAIL FEHLT ALS PARAMETER !! Z 68

import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  e_mail: string;
};

export async function getUserByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

export async function getEmailAddress(email: string) {
  if (!email) return undefined;

  const emailAdress: string = await sql<{ email: string }>`
SELECT
    e_mail
FROM
    users
WHERE
    e_mail = ${email}
`;

  return emailAdress;
}

export async function getUserWithPasswordHashWithoutEmailByUsername(
  username: string,
) {
  if (!username) return undefined;

  const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    users.id,
    users.username
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token} AND
    sessions.user_id = users.id AND
    sessions.expiry_timestamp > now();
  `;

  return user;
}

export async function createUser(
  username: string,
  password_hash: string,
  e_mail: string,
) {
  // !! EMAIL FEHLT ALS PARAMETER !!
  const [userWithoutPassword] = await sql<{ id: number; username: string }[]>`
  INSERT INTO users
    (username, password_hash, e_mail)
  VALUES
    (${username}, ${password_hash}, ${e_mail})
  RETURNING
    id,
    username
  `;

  return userWithoutPassword!;
}
