import { sql } from './connect';

export default async function getDifficulties() {
  const difficulty = await sql`SELECT * FROM difficulties;;`;

  return difficulty;
}
