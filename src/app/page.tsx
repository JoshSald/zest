import { getUserById, getAllData } from "./actions/api";

export default async function Home() {
  const { recipes } = await getAllData();
  return (
    <div className="container mx-auto py-12">
      <div className="recipes flex gap-4 flex-wrap justify-center">
        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className="card rounded-2xl to-background-cards"
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>Submitted by {getUserById(recipe.user_id)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
