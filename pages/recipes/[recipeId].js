import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import { getRecipeById } from '../../database/recipes';

const backButtonStyles = css`
  margin-left: 20px;
  border-radius: 4px;
  width: 80px;
  background-color: white;
  color: #e04326;
  :hover {
    background-color: #e04326;
    color: white;
  }
`;

export default function ShowSingleRecipe(props) {
  const [productQuantity, setPoductQuantity] = useState(1);
  // console.log('singleRecipe', singleRecipe);
  return (
    <>
      <Head>
        <title>The best cooking recipes </title>
        <meta
          name="NFT #1"
          content="Buy, sell and trade NFTs and become a virtual art collector!"
        />
        <link rel="icon" href="/2.jpg" />
      </Head>

      <div>
        <div>
          <div>
            <a href="/recipes">
              <button css={backButtonStyles}> 🠔 Back</button>
            </a>
          </div>
          <div>
            <div>
              <h1>Title: {props.singleRecipe[0].recipesTitle}</h1>
            </div>
            <div>ID: {props.singleRecipe[0].id}</div>
            <div>
              Preparation Time: {props.singleRecipe[0].preparationTime} Minutes
            </div>
            <p>Difficulty: {props.singleRecipe[0].difficultyName}</p>
            {console.log('singleRecipe', props.singleRecipe)}
          </div>
          <img
            src={`${props.singleRecipe[0].imageurl}`}
            width="758"
            height="380"
            css={css`
              border-radius: 12px;
            `}
          />
          <p>Ingredients: {props.singleRecipe[0].ingredientsName}</p>
          <p>Instruction: {props.singleRecipe[0].instruction}</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const recipeId = parseInt(context.query.recipeId);
  const singleRecipe = await getRecipeById(recipeId);

  return {
    props: {
      singleRecipe: singleRecipe,
      // allIngredients: allIngredients,
    },
  };
}
