import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UploadImage from '../components/UploadImage';
import getDifficulties from '../database/difficulties';
import getIngredients from '../database/ingredients';
import { getRecipesByUserId } from '../database/recipes';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user: User;
  ingredients: Awaited<ReturnType<typeof getIngredients>>;
  difficulties: Awaited<ReturnType<typeof getDifficulties>>;
  userRecipes: Awaited<ReturnType<typeof getRecipesByUserId>>;
};

export default function UserProfile(props: Props) {
  const profileStyles = css`
    margin: 50px 200px 0px;

    span {
      display: block;
      margin-bottom: 20px;
    }
  `;

  const recipeStyles = css`
    h1 {
      display: flex;
      justify-content: left;
      text-align: center;
      padding-top: 40px;
      margin: 0 auto;
      font-size: 50px;
      color: #006b4a;
    }

    p {
      font-size: 20px;
    }
    h2 {
      margin-top: 40px;
      color: #006b4a;
    }

    .text-preptime {
      height: 30px;
      width: 300px;
      font-size: 16px;
      margin-bottom: 15px;
      border-radius: 8px;
      border: 1px solid #006b4a;
    }
    .instruction {
      border-radius: 8px;
      border: 1px solid #006b4a;
      font-size: 16px;
    }

    #selectList {
      height: 30px;
      width: 300px;
      font-size: 16px;
      border-radius: 20px;
      background-color: white;
      color: #006b4a;
      border-radius: 8px;
      border: 1px solid #006b4a;
    }
    #ingredients {
      margin-right: 10px;
      margin-bottom: 10px;
      height: 15px;
      width: 15px;
    }

    #instructions {
      width: 100%;
      height: 300px;
    }
    button {
      height: 30px;
      width: 300px;
      font-size: 14px;
      border-radius: 20px;
      background-color: #006b4a;
      color: white;
      margin: 20px 0px 20px;
      border-radius: 8px;
      border: none;
    }
    button:hover {
      background-color: white;
      color: #006b4a;
      border: 1px solid #006b4a;
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
  const [recipeCreated, setRecipeCreated] = useState(false);
  const [profileInfoUpdated, setProfileInfoUpdated] = useState(false);
  const router = useRouter();
  const userAccountId = props.user.id;

  // selects and filter the ingredients
  function handleCheck(index: never) {
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
    await router.push(`/recipes/`);
    return;

    console.log('createdRecipeFromApiById', createdRecipeFromApiById);
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
        <title>Create Recipe</title>
        <meta
          name="description"
          content="Create tasty recipes and share it with everyone"
        />
      </Head>

      <div css={profileStyles}>
        <div css={recipeStyles}>
          <h1>Share Your Recipes</h1>
          <p>
            Share your recipes and get in touch with like-minded cooking lovers!
          </p>
          <div>
            <form
              onSubmit={(event) => {
                return event.preventDefault(), setRecipeCreated(true);
              }}
            >
              <h2 data-test-id={'upload-image'}>1. Upload Image</h2>
              {/* Image Upload component */}
              <UploadImage setImageUrl={setImageUrl} />

              <h2>2. Choose a Title</h2>
              <input
                placeholder="My Recipe Title"
                className="text-preptime"
                value={recipeTitle}
                onChange={(event) => {
                  setRecipeTitle(event?.currentTarget.value);
                }}
              />
              <div>
                <h2>3. Choose Ingredients</h2>
                {props.ingredients.map((ingredient: any, index: number) => {
                  return (
                    <label id="ingredients" key={index}>
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
              <h2>4. Preparation Time in minutes</h2>
              <input
                placeholder="e.g. 60"
                className="text-preptime"
                value={preparationTime}
                onChange={(event) => {
                  setPreparationTime(event?.currentTarget.value);
                }}
              />
              <div>
                <h2>5. Select Difficulty</h2>

                <select
                  name="selectList"
                  id="selectList"
                  onChange={(event) => {
                    setDifficulty(event?.target.value);
                  }}
                >
                  {props.difficulties.map((difficulty) => {
                    return (
                      <option value={difficulty.id}>{difficulty.name}</option>
                    );
                  })}
                </select>
              </div>
              <div>
                <h2>6. Instruction (max. 1000 chars)</h2>
                <textarea
                  placeholder="Share your cooking secrets here :-)"
                  className="instruction"
                  id="instructions"
                  value={recipeInstructions}
                  onChange={(event) => {
                    setRecipeInstructions(event.currentTarget.value);
                  }}
                />
              </div>
              <button
                onClick={async () => {
                  await createRecipeFromApiById(userAccountId);
                }}
              >
                Submit My Recipe
              </button>
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

  const userId = user!.id;
  const userRecipes = await getRecipesByUserId(userId);

  return {
    props: {
      user: user,
      ingredients: ingredients,
      difficulties: difficulties,
      userRecipes: userRecipes,
    },
  };
}
