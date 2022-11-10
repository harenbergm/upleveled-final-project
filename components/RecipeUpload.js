import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';

export default function RecipeUpload(props) {
  const recipeInstructionsStyles = css`
    width: 800px;
    height: 300px;
  `;

  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [ingredients, setIngredients] = useState([]);

  // selects and filter the ingredients
  function handleCheck(index) {
    if (ingredients.includes(index)) {
      const filteredIngredient = ingredients.filter((ingredient) => {
        return ingredient !== index;
      });
      setIngredients(filteredIngredient);
    } else {
      setIngredients([...ingredients, index]);
    }
  }

  return (
    <div>
      <Head>
        <title>Private-Profile</title>
        <meta name="Welcome to your private profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h4>Recipe Name</h4>
          <label>
            Title
            <input />
          </label>
        </div>
        <div>
          <h3>Chose Your Ingredients</h3>

          {props.ingredients.map((ingredient, index) => {
            return (
              <label key={index}>
                {ingredient.name}
                <input
                  value={ingredient.id}
                  type="checkbox"
                  onChange={() => {
                    handleCheck(index + 1);
                  }}
                />
              </label>
            );
          })}

          <div>
            <h4>Instruction (max. 1000 chars)</h4>
            <input
              css={recipeInstructionsStyles}
              value={recipeInstructions}
              onChange={(event) => {
                setRecipeInstructions(event.currentTarget.value);
              }}
            />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
