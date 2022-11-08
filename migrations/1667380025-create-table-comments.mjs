export async function up(sql) {
  await sql`
    INSERT INTO animals ${sql(animals, 'first_name', 'type', 'accessory')}
`;
}

export async function down(sql) {
  await sql`
    DROP TABLE comments
  `;
}
