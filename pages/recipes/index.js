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

      {props.allRecipes.map((recipe) => {
        return (
          <div>
            <div key={recipe.id}>
              <h3>{recipe.recipesTitle}</h3>
              <span> ID: {recipe.id}</span>
              <br />
              <span>Preparation Time: {recipe.preparationTime} minutes</span> |
              <span> Difficulty: {recipe.difficultyName}</span>
              {/* <div>Ingredients {recipe.getRecipeIngredients(recipe.id)}</div> */}
              <div>
                <a href={`/recipes/${recipe.id}`}>
                  <img
                    width="576"
                    heigth="384"
                    src={`${recipe.imageurl}`}
                    data-test-id={'recipe-link'}
                  />
                </a>
                <p>Ingredients: {recipe.ingredientsName}</p>
                <p>Instruction: {recipe.instruction}</p>
              </div>
              <hr />
              {/* {props.allIngredients.map((ingredients) => {
                return (
                  ingredients[0].name,
                  console.log('ingredients[0].name', ingredients[0].name)
                );
              })} */}
              {/* // console.log('ingredient', ingredient), //
              console.log('ingredient.name', ingredient.name)
              console.log('props.allIngredients', props.allIngredients); */}
              {/* {props.allIngredients.map((ingredients) => {
                ingredients.map((ingredient) => {
                  return (
                    (<div>HERE !!{ingredient.name}</div>),
                    console.log('ingredient', ingredient),
                    console.log('ingredient.name', ingredient.name)
                  );
                });
                console.log('props.allIngredients', props.allIngredients);
              })} */}
              <hr />
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  // calls all recipes without duplicates
  const allRecipes = await getAllRecipesWithoutDuplicatesRecipeId();
  // calls only 1 ingredient per recipe
  const getRecipeIngredients = await getIngredientsByRecipeId();

  // get all ingredients by recipe id
  let ingredients;
  const allIngredients = [];

  for (const recipe of allRecipes) {
    ingredients = await getIngredientsByRecipeId(recipe.id);
    allIngredients.push(ingredients);
  }

  console.log('arraypush', allIngredients);

  return {
    props: {
      allRecipes: allRecipes,
      getRecipeIngredients: getRecipeIngredients,
      allIngredients: allIngredients,
    },
  };
}
