import { css } from '@emotion/react';
import { CldImage } from 'next-cloudinary';
import Head from 'next/head';
import { getIngredientsByRecipeId } from '../../database/ingredients';
import { getAllRecipesWithoutDuplicatesRecipeId } from '../../database/recipes';

const headlineStyles = css`
  margin-top: 80px;

  h1 {
    padding-top: 40px;
    margin: 0 auto;
    font-size: 50px;
    color: #006b4a;
  }
  h2 {
    padding-top: 20px;
    margin: 0 auto;
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
    color: #006b4a;
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
    white-space: nowrap;
  }
`;

export default function ShowRecipes(props) {
  return (
    <>
      <Head>
        <title>Nasch Cooking Recipes</title>
        <meta
          name="Show cooking recipes"
          content="Find delicoius recipes everyday"
        />
      </Head>

      <div css={headlineStyles}>
        <h1>Find Delicoius Recipes Everyday</h1>
        <h2>And Share Yours With Others</h2>
        <div>{props.allRecipes.length} Recipes found</div>
      </div>
      <div css={recipeWrapper}>
        {/* get Recipes from the database */}
        {props.allRecipes.map((recipe) => {
          return (
            <div>
              <div key={recipe.id} css={recipeStyles}>
                <div>
                  <a href={`/recipes/${recipe.id}`}>
                    {/* CldImage to display cloudinary images properly */}
                    <CldImage
                      css={img}
                      width="432"
                      height="288"
                      src={`${recipe.imageurl}`}
                    />
                  </a>
                </div>
                <div css={recipeDescriptionStyles}>
                  <h3>{recipe.recipesTitle}</h3>
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
                    />
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

  return {
    props: {
      allRecipes: allRecipes,
      getRecipeIngredients: getRecipeIngredients,
      allIngredients: allIngredients,
    },
  };
}
