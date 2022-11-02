export async function up(sql) {
  await sql`
    CREATE TABLE difficulties (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      name varchar (15) NOT NULL
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE difficulties
  `;
}
