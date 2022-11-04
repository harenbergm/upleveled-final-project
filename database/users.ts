// !! EMAIL FEHLT ALS PARAMETER !! Z 68

// import { userAgentFromString } from 'next/server';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  eMail: string;
};

export async function getUserByUsername(username: string) {
  if (!username) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username,
    password_hash,
    e_mail
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

// Get a single users by valid session token
export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  // STRETCH: Update this adding a role to the users and matching it with the session token
  const [user] = await sql<User[]>`
    SELECT
      users.*
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()

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

  const [user] = await sql<{ id: number; username: string; e_mail: string }[]>`
  SELECT
    users.id,
    users.username,
    e_mail
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

// Get a user by name and valid session token
export async function getUserByUsernameAndValidSessionToken(
  username: string,
  token: string,
) {
  if (!token) return undefined;

  const [user] = await sql<User[]>`
  SELECT
    users.*
  FROM
    users,
    sessions
  WHERE
    sessions.token = ${token}
  AND
    sessions.expiry_timestamp > now()
  AND
    users.username = ${username}
`;
  return user;
}

export async function createUser(
  username: string,
  password_hash: string,
  e_mail: string,
) {
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

export async function updateUserById(
  id: number,
  username: string,
  email: string,
) {
  const [user] = await sql`
  UPDATE
    users
  SET
    username = ${username},
    e_mail = ${email}
  WHERE
    id = ${id}
  RETURNING *
  `;
  return user;
}
