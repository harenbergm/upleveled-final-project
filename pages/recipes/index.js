import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { getIngredientsByRecipeId } from '../../database/ingredients';
import { getAllRecipesWithoutDuplicatesRecipeId } from '../../database/recipes';

const headlineStyles = css`
  margin-top: 80px;

  h1 {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 40px;
    margin: 0 auto;
    font-size: 50px;
    color: #007e58;
  }
  h2 {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 20px;
    margin: 0 auto;
    font-size: 30px;
    color: #007e58;
    margin-bottom: 60px;
  }

  div {
    text-align: center;
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: -40px;
  }
`;

const recipeWrapper = css`
  /* margin-left: 40%;
  margin-right: 10%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px 5%;

  h3 {
    font-size: 22px;
  }

  span {
    display: inline-block;
    justify-content: center;
    text-align: center;
    margin-right: 10%;
    color: green;
    margin-bottom: 10px;
  }
`;

const recipeStyles = css`
  box-shadow: 4px 6px #888888;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
`;

const img = css`
  border-radius: 12px;
  max-width: 432px;
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
        <div>{props.allRecipes.length} Recipes found</div>
      </div>

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
                      width="432"
                      height="288"
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

                  <span>
                    <img
                      src="/difficulty.png"
                      alt=".."
                      width="15"
                      heigth="15"
                    />{' '}
                    {recipe.difficultyName}
                  </span>

                  <div className="instructions">
                    Instruction: {recipe.instruction}
                  </div>
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

  // console.log('arraypush', allIngredients);

  return {
    props: {
      allRecipes: allRecipes,
      getRecipeIngredients: getRecipeIngredients,
      allIngredients: allIngredients,
    },
  };
}
