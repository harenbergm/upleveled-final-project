import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
// import RecipeUpload from '../components/RecipeUpload';
import UploadImage from '../components/UploadImage';
import getDifficulties from '../database/difficulties';
import getIngredients from '../database/ingredients';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user: User;
  ingredients: Awaited<ReturnType<typeof getIngredients>>;
  difficulties: Awaited<ReturnType<typeof getDifficulties>>;
};

export default function UserProfile(props: Props) {
  const profileStyles = css`
    margin: 50px 200px 0px;

    span {
      display: block;
      margin-bottom: 20px;
    }
  `;

  const personalInformationStyles = css`
    label {
      display: inline-block;
      border-radius: 4px;
      margin-bottom: 10px;
      font-weight: 500;
    }

    input {
      margin-left: 50px;
      margin-right: 30px;
    }

    button {
      border: 2px solid green;
      display: inline-block;
      border-radius: 4px;
      background-color: white;
      color: green;
    }
    #deleteProfile {
      display: block;
      margin-top: 20px;
      border: red 1px solid;
      border-radius: 4px;
      background-color: white;
      color: red;
      margin-bottom: 30px;
    }
  `;

  const recipeStyles = css`
    h4 {
      margin-top: 40px;
    }
    #ingredients {
      margin-right: 10px;
      margin-bottom: 10px;
    }
    #instructions {
      width: 100%;
      height: 300px;
    }
    button {
      margin-top: 20px;
      border: 2px solid green;
      display: inline-block;
      border-radius: 4px;
      background-color: white;
      color: green;
    }
  `;

  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.eMail);
  const [imageUrl, setImageUrl] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [preparationTime, setPreparationTime] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const userAccountId = props.user.id;

  // selects and filter the ingredients
  function handleCheck(index: number) {
    if (ingredients.includes(index)) {
      const filteredIngredient = ingredients.filter((ingredient) => {
        return ingredient !== index;
      });
      setIngredients(filteredIngredient);
    } else {
      setIngredients([...ingredients, index]);
    }
  }

  // creates recipe
  async function createRecipeFromApiById(userAccountId: number) {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        recipe: {
          userAccountId: userAccountId,
          titleSelected: recipeTitle,
          preparationTimeSelected: preparationTime,
          imageURL: imageUrl,
          recipeInstructionsSelected: recipeInstructions,
          difficultyId: difficulty,
        },
        recipeIngredients: {
          selectedIngredients: ingredients,
        },
      }),
    });
    const createdRecipeFromApiById = await response.json();
  }

  // creates recipes_ingredients
  async function createRecipes_IngredientsFromApi() {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ingredientsSelected: ingredients,
      }),
    });

    const createdRecipesIngredientsFromApi = await response.json();
    console.log(
      'createdRecipesIngredientsFromApi',
      createdRecipesIngredientsFromApi,
    );
    console.log('ingredientsSelected', ingredients);
  }

  // Updates User Profile
  async function updateUserFromApiById(id: number) {
    const response = await fetch(`/api/profiles/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        iD: id,
        userName: username,
        eMail: email,
      }),
    });

    const updatedUsernameFromApi = (await response.json()) as User;
  }

  // Deletes User Profile
  async function deleteUserFromApiById(id: number) {
    const response = await fetch(`/api/profiles/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        iD: id,
      }),
    });
    const deletedUserFromApiById = await response.json();
  }

  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <div css={profileStyles}>
        <h1>Private Profile</h1>
        <hr />
        <h2>Personal Information</h2>
        <span> Account ID: {props.user.id}</span>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div css={personalInformationStyles}>
            <label>
              Username:
              <input
                value={username}
                onChange={(event) => {
                  setUsername(event?.currentTarget.value);
                }}
              />
            </label>
            <button
              onClick={() => {
                updateUserFromApiById(props.user.id);
              }}
            >
              Save Changes
            </button>
            <br />
            <label>
              E-Mail:
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event?.currentTarget.value);
                }}
              />
              <button
                onClick={() => {
                  updateUserFromApiById(props.user.id);
                }}
              >
                Save Changes
              </button>
            </label>
            <button
              id="deleteProfile"
              onClick={() => {
                deleteUserFromApiById(props.user.id);
              }}
            >
              Delete Profile
            </button>
            <hr />
          </div>
        </form>
        <div css={recipeStyles}>
          <h2>Share Your Recipes</h2>
          <p>
            Share your recipes in four easy steps and get in touch with
            like-minded cooking lovers!
          </p>
          <div>
            <form
              onSubmit={(event) => {
                return (
                  event.preventDefault(), createRecipeFromApiById(userAccountId)
                );
              }}
            >
              <h4>1. Upload Image</h4>
              <UploadImage setImageUrl={setImageUrl} />

              <h4>2. Choose a Title</h4>
              <input
                value={recipeTitle}
                onChange={(event) => {
                  setRecipeTitle(event?.currentTarget.value);
                }}
              />
              <div>
                <h4>3. Choose Ingredients</h4>
                {props.ingredients.map((ingredient: any, index: any) => {
                  return (
                    <label key={index}>
                      {ingredient.name}
                      <input
                        id="ingredients"
                        value={ingredient.id}
                        type="checkbox"
                        onChange={() => {
                          handleCheck(index + 1);
                        }}
                      />
                    </label>
                  );
                })}
              </div>
              <h4>4. Preparation Time in minutes</h4>
              <input
                value={preparationTime}
                onChange={(event) => {
                  setPreparationTime(event?.currentTarget.value);
                }}
              />
              <div>
                <h4>5. Select Difficulty</h4>

                <select
                  name="selectList"
                  id="selectList"
                  onChange={(event) => {
                    setDifficulty(event?.target.value);
                  }}
                >
                  {props.difficulties.map((difficulty: string) => {
                    return (
                      <option value={difficulty.id}>{difficulty.name}</option>
                    );
                  })}
                </select>
              </div>
              <div>
                <h4>6. Instruction (max. 1000 chars)</h4>
                <input
                  id="instructions"
                  value={recipeInstructions}
                  onChange={(event) => {
                    setRecipeInstructions(event.currentTarget.value);
                  }}
                />
              </div>
              <button>Submit My Recipe</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ingredients = await getIngredients();
  const difficulties = await getDifficulties();
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      ingredients,
      difficulties,
    },
  };
}
