import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
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
      {props.allRecipes.map((recipe) => {
        // console.log('recipe', recipe);
        return (
          <div>
            <h1>Title: {recipe.recipesTitle}</h1>
            <span>Preparation Time: {recipe.preparationTime} minutes</span> |
            <span> Difficulty: {recipe.difficultyName}</span>
            <div>
              <a href={`/recipes/${recipe.id}`}>
                <img width="576" heigth="384" src={`${recipe.imageurl}`} />
              </a>
              <p>Ingredients: {recipe.ingredientsName}</p>
              <p>Instruction: {recipe.instruction}</p>
              <span> ID: {recipe.id}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  const allRecipes = await getAllRecipes();
  // const allIngredients = await getIngredients();

  return {
    props: {
      allRecipes: allRecipes,
      // allIngredients: allIngredients,
    },
  };
}
