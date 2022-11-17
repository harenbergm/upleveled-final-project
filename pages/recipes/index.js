import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getIngredientsByRecipeId } from '../../database/ingredients';
import { getAllRecipesWithoutDuplicatesRecipeId } from '../../database/recipes';

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
      {props.getAllRecipes.map((recipe) => {
        console.log('getRecipeIngredients', props.getRecipeIngredients);
        return (
          <div key={recipe.id}>
            <h1>Title: {recipe.recipesTitle}</h1>
            <span>Preparation Time: {recipe.preparationTime} minutes</span> |
            <span> Difficulty: {recipe.difficultyName}</span>
            {/* <div>Ingredients {recipe.getRecipeIngredients(recipe.id)}</div> */}
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
  const getAllRecipes = await getAllRecipesWithoutDuplicatesRecipeId();
  const getRecipeIngredients = await getIngredientsByRecipeId();
  // console.log('getAllRecipes', getAllRecipes);

  // ingredients = await getAllRecipes.map(async (recipe) => {
  //   return getIngredientsByRecipeId(recipe.id);
  // });
  // console.log('ingredients', ingredients);
  return {
    props: {
      getAllRecipes: getAllRecipes,
      getRecipeIngredients: getRecipeIngredients,
    },
  };
}
