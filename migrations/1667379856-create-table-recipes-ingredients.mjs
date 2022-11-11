export async function up(sql) {
  await sql`
    CREATE TABLE recipes_ingredients (
      PRIMARY KEY (recipe_id, ingredient_id),
      recipe_id integer REFERENCES recipes (id) ON DELETE CASCADE NOT NULL,
      ingredient_id integer REFERENCES ingredients (id) ON DELETE CASCADE NOT NULL
      )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE recipes_ingredients
  `;
}
