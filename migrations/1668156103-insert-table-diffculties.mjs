const difficulties = [
  { name: 'Easy' },
  { name: 'Medium' },
  { name: 'Difficult' },
];

export async function up(sql) {
  await sql`
    INSERT INTO difficulties ${sql(difficulties, 'name')}
`;
}

export async function down(sql) {
  for (const difficulty of difficulties) {
    await sql`
      DELETE FROM
      difficulties
      WHERE
        name = ${difficulty};
       `;
  }
}
