import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getIngredientsByRecipeId } from '../../database/ingredients';
import { getAllRecipesWithoutDuplicatesRecipeId } from '../../database/recipes';

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

const recipeWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px 5%;
`;

const recipeStyles = css`
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
`;

const img = css`
  border-radius: 12px;
  max-width: 432;
  height: 288px;
`;

const preparationTimeIcon = css`
  height: 13px;
  width: 13px;
  margin-right: 5px;
`;

const recipeDescriptionStyles = css`
  margin-left: 10px;

  span {
    justify-content: center;
    margin-right: 20px;
  }

  .instructions {
    max-width: 432px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
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
      <div>{props.allRecipes.length} Recipes found</div>

      <div css={recipeWrapper}>
        {props.allRecipes.map((recipe) => {
          return (
            <div>
              <div key={recipe.id} css={recipeStyles}>
                <div>
                  <a href={`/recipes/${recipe.id}`}>
                    <img
                      css={img}
                      src={`${recipe.imageurl}`}
                      data-test-id={'recipe-link'}
                    />
                  </a>
                </div>
                <div css={recipeDescriptionStyles}>
                  <h3>{recipe.recipesTitle}</h3>
                  {/* <span> ID: {recipe.id}</span> */}
                  <span>
                    <img
                      src="/icon-watch.png"
                      alt=".."
                      css={preparationTimeIcon}
                    />
                    {recipe.preparationTime} minutes
                  </span>
                  |
                  <span>
                    <img
                      src="/difficulty.png"
                      alt=".."
                      width="15"
                      heigth="15"
                    />{' '}
                    {recipe.difficultyName}
                  </span>
                  {/* <p>Ingredients: {recipe.ingredientsName}</p> */}
                  <p className="instructions">
                    Instruction: {recipe.instruction}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
