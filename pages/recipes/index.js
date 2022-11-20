import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getIngredientsByRecipeId } from '../../database/ingredients';
import { getAllRecipesWithoutDuplicatesRecipeId } from '../../database/recipes';

// const gridStyles = css`
//   display: grid;
//   grid-template-columns: 420px 420px 420px 420px;
//   grid-template-rows: 420px 420px 420px 420px;
//   grid-gap: 10px;
//   justify-content: center;
//   align-items: center;
// `;

// const gridboxStyles = css`
//   grid-auto-flow: row;
//   width: 420px;
//   height: 280px;
//   border-radius: 12px;
//   display: block;
// `;

const headlineStyles = css`
  h1 {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 40px;
    margin: 0 auto;
  }
  h2 {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 20px;
    margin: 0 auto;
  }
`;

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
      <div css={headlineStyles}>
        <h1>Find Your Recipes By Ingredients</h1>
        <h2>You wish to have in your recipe</h2>
      </div>

      {props.getAllRecipes.map((recipe) => {
        return (
          <div>
            <div key={recipe.id}>
              <h2>{recipe.recipesTitle}</h2>
              <span> ID: {recipe.id}</span>
              <br />
              <span>Preparation Time: {recipe.preparationTime} minutes</span> |
              <span> Difficulty: {recipe.difficultyName}</span>
              {/* <div>Ingredients {recipe.getRecipeIngredients(recipe.id)}</div> */}
              <div>
                <a href={`/recipes/${recipe.id}`}>
                  <img width="576" heigth="384" src={`${recipe.imageurl}`} />
                </a>
                <p>Ingredients: {recipe.ingredientsName}</p>
                <p>Instruction: {recipe.instruction}</p>
              </div>
              {props.ingredients}
              {/* {console.log('props.ingredients', props.ingredients)} */}
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  // calls all recipes without duplicates
  const getAllRecipes = await getAllRecipesWithoutDuplicatesRecipeId();
  // calls only 1 ingredient per recipe
  const getRecipeIngredients = await getIngredientsByRecipeId();

  // calls arrays with ingredients
  // const ingredients = await getAllRecipes.map(async (recipe) => {
  //   return Promise.all(
  //     getIngredientsByRecipeId(recipe.id).then((ingredients) => {
  //       console.log('ingredients', ingredients);
  //     }),
  //   );
  // });

  return {
    props: {
      getAllRecipes: getAllRecipes,
      getRecipeIngredients: getRecipeIngredients,
      // ingredients: ingredients,
    },
  };
}
