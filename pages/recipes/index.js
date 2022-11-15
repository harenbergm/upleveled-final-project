import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
// import { getIngredients } from '../../database/ingredients';
import { getAllRecipes } from '../../database/recipes';

export default function ShowRecipes(props) {
  return (
    <>
      <Head>
        <title>Show cooking recipes</title>
        <meta
          name="Show cooking recipes"
          content="Here you yan see all cooking recipes created by users"
        />
      </Head>
      <h1>Choose Your Ingredients</h1>
      <p>You wish to include in your recipe</p>
      <div>
        <select>
          {props.ingredients.map((ingredient) => {
            return <option value={1}>{ingredient.name}</option>;
          })}
        </select>
      </div>
      {props.allRecipes.map((recipe) => {
        return (
          <div>
            <div>
              <a href={`/recipes/${recipes.id}`}>
                <Image
                  src={`/${recipe.imageurl}.jpg`}
                  width="576"
                  height="384"
                />
              </a>
            </div>
            <div>
              <h1>{recipe.name}</h1>
              <p>
                Difficulty: {recipe.difficulty_id} | Preparation time:{' '}
                {recipe.preparation_time} min
              </p>
              <p>Ingrediences: {recipes_ingrediences.ingredient_id}</p>
              <br />
              Instruction:
              <br />
              {recipe.instruction}
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  const allRecipes = await getAllRecipes();
  const allIngredients = await getIngredients();

  return {
    props: {
      allRecipes: allRecipes,
      allIngredients: allIngredients,
    },
  };
}
