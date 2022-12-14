import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getDifficulties from '../database/difficulties';
import getIngredients from '../database/ingredients';
import { getRecipesByUserId } from '../database/recipes';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user: User;
  ingredients: Awaited<ReturnType<typeof getIngredients>>;
  difficulties: Awaited<ReturnType<typeof getDifficulties>>;
  userRecipes: Awaited<ReturnType<typeof getRecipesByUserId>>;
  refreshUserProfile: () => void;
};

export default function UserProfile(props: Props) {
  const profileStyles = css`
    margin: 100px 200px 0px;

    h1 {
      justify-content: left;
    }

    h2 {
      justify-content: left;
    }

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

    .username {
      margin-left: 28px;
      margin-right: 30px;
      border-radius: 4px;
      border: 1px solid #006b4a;
    }

    .email {
      margin-left: 50px;
      margin-right: 30px;
      border-radius: 4px;
      border: 1px solid #006b4a;
    }

    #deleteProfile {
      display: block;
      margin-top: 20px;
      border: red 1px solid;
      border-radius: 14px;
      color: white;
      background-color: red;
      margin-bottom: 30px;
    }
    #deleteProfile:hover {
      background-color: white;
      color: red;
      border: 1px solid red;
    }
  `;

  const createdrecipeWrapper = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  `;

  const cards = css`
    box-shadow: 4px 6px #888888;
    border-radius: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #31b67c;
    justify-content: center;
    max-width: 140px;

    #editbutton {
      width: 60px;
      border-radius: 8px;
      border: 1px solid white;
      margin-right: 0px;
      background-color: #31b67c;
      color: white;
      border: 1px solid white;
    }
    #editbutton:hover {
      color: #31b67c;
      background-color: white;
      border: 1px solid white;
    }

    #deletebutton {
      width: 60px;
      border-radius: 8px;
      border: 1px solid white;
      background-color: red;
      color: white;
      border: 1px solid white;
    }
    #deletebutton:hover {
      color: red;
      background-color: white;
      border: 1px solid white;
    }
  `;

  const preparationTimeIcon = css`
    height: 13px;
    width: 13px;
    margin-right: 5px;
  `;

  const difficultyIcon = css`
    height: 13px;
    width: 13px;
    margin-right: 5px;

    span {
      justify-content: center;
      margin-right: 20px;
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
  const [deletedUser, setDeletedUser] = useState(0);
  const [recipiesList, setRecipiesList] = useState(props.userRecipes);
  const router = useRouter();
  const userAccountId = props.user.id;

  useEffect(() => {
    setDeletedUser(0);
  }, [deletedUser]);

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

    setDeletedUser(deletedUserFromApiById.deletedUser.id);
    props.refreshUserProfile();
    await router.push(`/logout`);
  }

  // deletes recipe by recipe id
  async function deleteRecipeFromApiByRecipeId(
    recipeId: number,
    // recipiesList: array,
  ) {
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: recipeId,
        userAccountId: userAccountId,
      }),
    });

    const deletedRecipeResponse = await response.json();

    // console.log('deletedRecipeResponse', deletedRecipeResponse.id);

    // const recipeListFiltered = recipiesList.filter((recipe: any) => {
    //   recipe[0].id !== recipeId;
    //   console.log('recipeId', recipeId);
    //   console.log('recipeListFiltered', recipeListFiltered);
    // });
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
        <h1>{username}'s Private Profile</h1>
        <hr />
        <h2>Personal Information</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div css={personalInformationStyles}>
            <label>
              Edit Username:
              <input
                className="username"
                value={username}
                onChange={(event) => {
                  setUsername(event?.currentTarget.value);
                }}
              />
            </label>
            <button
              onClick={() => {
                updateUserFromApiById(props.user.id);
                setProfileInfoUpdated(true);
              }}
            >
              Save Changes
            </button>
            <br />
            <label>
              Edit E-Mail:
              <input
                className="email"
                value={email}
                onChange={(event) => {
                  setEmail(event?.currentTarget.value);
                }}
              />
              <button
                onClick={() => {
                  updateUserFromApiById(props.user.id);
                  setProfileInfoUpdated(true);
                }}
              >
                Save Changes
              </button>
            </label>
            <button
              data-test-id={'delete-profile-button'}
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
        <h2>My Created Recipes</h2>
        <div css={createdrecipeWrapper}>
          {recipiesList.map((userRecipe) => {
            return (
              <div key={userRecipe.id} css={cards}>
                <h3>{userRecipe.recipesTitle}</h3>
                <div>
                  <p>
                    <img
                      src="/icon-watch.png"
                      alt=".."
                      css={preparationTimeIcon}
                    />{' '}
                    {userRecipe.preparationTime} minutes
                  </p>
                  <p>
                    <img src="/difficulty.png" alt=".." css={difficultyIcon} />{' '}
                    {userRecipe.difficultyName}
                  </p>

                  <span>Ingredients: {userRecipe.ingredientsName}..</span>
                  <button id="editbutton">Edit</button>
                  <button
                    id="deletebutton"
                    onClick={() => {
                      deleteRecipeFromApiByRecipeId(userRecipe.id);
                    }}
                  >
                    Delete
                  </button>
                  <br />
                </div>
              </div>
            );
          })}
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
