import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function getAllData() {
  const [
    users,
    userNotes,
    userFavorites,
    ingredients,
    recipes,
    recipeIngredients,
  ] = await Promise.all([
    sql`SELECT * FROM users`,
    sql`SELECT * FROM user_notes`,
    sql`SELECT * FROM user_favorites`,
    sql`SELECT * FROM ingredients`,
    sql`SELECT * FROM recipes`,
    sql`SELECT * FROM recipe_ingredients`,
  ]);

  return {
    users,
    userNotes,
    userFavorites,
    ingredients,
    recipes,
    recipeIngredients,
  };
}

export async function getUserById(id: string) {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`;
  const user = result[0]; // result is an array

  return user?.username ?? "An Anonymous Hero!";
}
// See https://neon.com/docs/serverless/serverless-driver
// for more information
