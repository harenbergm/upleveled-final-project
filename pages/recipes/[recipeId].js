import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getIngredientsByRecipeId } from '../../database/ingredients';
import { getCommentByRecipeId } from '../../database/recipecomments';
import { getRecipeByRecipeId } from '../../database/recipes';
import { getUserBySessionToken } from '../../database/users';

const backButtonStyles = css`
  margin-top: 50px;
  margin-left: 20px;
  border-radius: 12px;
  width: 80px;
  border: 1px solid white;
  background-color: #007e58;
  color: white;
  :hover {
    background-color: white;
    color: #007e58;
    border: 1px solid #007e58;
  }
`;

// const recipeWrapper = css`
//   /* margin-left: 40%;
//   margin-right: 10%; */
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 30px 5%;
//   border: 2px solid pink;
// `;

const recipeStyles = css`
  width: 576px;
  /* border: 2px solid blue; */
  justify-content: center;
  margin: 0 auto;

  h1 {
    display: flex;
    justify-content: center;
    text-align: center;
    color: #007e58;
    padding-top: 20px;
    margin-bottom: 60px;
    font-size: 50px;
  }

  img {
    /* box-shadow: 4px 6px #888888;
    border-radius: 20px;
    padding: 10px;
    margin: 10px; */
  }

  div {
    display: flex;
    justify-content: center;
  }
  /* div :nth-child(3) {
  }

  div :nth-child(4) {
    display: flex;
    justify-content: left;
    color: yellow;
  } */

  span {
    padding: 15px 0px 15px;
    color: green;
  }

  h4 {
    width: 576px;
    display: flex;
    justify-content: right;
    color: green;
    justify-content: left;
  }

  div > span {
    margin-top: 10px;
    margin-right: 5px;
  }

  .ingredients {
    justify-content: center;
    margin: 10px 0px 15px;
  }

  p {
    display: flex;
    justify-content: center;
  }
  #preparation {
    width: 576px;
    margin-bottom: 30px;
    justify-content: left;

    /* hyphens: auto; */
    /* inline-size: 350px; */
    /* overflow-wrap: break-word; */
    overflow-x: scroll;
    overflow-y: scroll;
    word-wrap: break-word;
  }
`;

const preparationTimeIcon = css`
  height: 13px;
  width: 13px;
  margin-right: 5px;
  margin-left: -30px;
`;

const difficultyIcon = css`
  height: 13px;
  width: 13px;
  margin-left: 30px;
`;

const formStyles = css`
  justify-content: center;
  margin: 0 auto;
  div > * {
    /* display: block;
    justify-content: right;
    margin: 0 auto; */
    justify-content: center;
    margin: 0 auto;
  }
`;

const commentButtonStyles = css`
  border-radius: 12px;
  width: 80px;
  padding: 2px;
  background-color: #007e58;
  border: 1px solid white;
  color: white;
  :hover {
    background-color: white;
    color: #007e58;
    border: 1px solid #007e58;
  }
`;

export default function ShowSingleRecipe(props) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [comment, setComment] = useState('');
  const [commentList, setcommentList] = useState(props.comments);
  const router = useRouter();
  const userAccountId = props.user?.id;
  const recipeId = props.singleRecipe[0].id;
  const username = props.user?.username;

  // creates comment
  async function createCommentFromApiByUserId(userAccountId) {
    // ask the user to login if it did not
    if (!props.user) {
      await router.push(`/login?returnTo=/recipes/${recipeId}`);
      return;
    }
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        comment: {
          content: comment,
          recipeId: recipeId,
          userAccountId: userAccountId,
          username: username,
          currentDate: currentDate,
        },
      }),
    });
    const createdCommentFromApiByUserId = await response.json();
    setcommentList([
      ...commentList,
      createdCommentFromApiByUserId.newComment[0],
    ]);
    setComment('');
  }

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
        <a href="/recipes">
          <button css={backButtonStyles}> 🠔 Back</button>
        </a>
      </div>
      <div>
        <div css={recipeStyles}>
          <h1>{props.singleRecipe[0].recipesTitle}</h1>
          {/* </div> */}
          <div>
            <img
              src={`${props.singleRecipe[0].imageurl}`}
              width="576"
              height="432"
              css={css`
                border-radius: 12px;
              `}
              alt={`${props.singleRecipe[0].recipesTitle} Recipe`}
            />
          </div>
          <div>
            <span data-test-id={'preparation-time'}>
              <img src="/icon-watch.png" alt=".." css={preparationTimeIcon} />
              {props.singleRecipe[0].preparationTime} minutes
            </span>
            <span>
              <img src="/difficulty.png" alt=".." css={difficultyIcon} />{' '}
              {props.singleRecipe[0].difficultyName}
            </span>
          </div>
          <div className="ingredients">Ingredients:</div>
          <div data-test-id={'ingredients'}>
            {props.ingredients.map((ingredient) => {
              return <div>{ingredient.name} ,</div>;
            })}
          </div>
          <h4>Preparation:</h4>

          <div id="preparation" data-test-id={'instruction'}>
            {props.singleRecipe[0].instruction}
          </div>
        </div>
        <hr width="576" />

        {commentList.length > 0 ? (
          commentList.map((comment) => {
            return (
              <div css={{ marginLeft: 470, maxHeight: 500 }}>
                <p>
                  <b>
                    {comment.userName} {''}
                    on {comment.date}
                  </b>
                </p>
                <div css={{ marginBottom: 30 }}>
                  <i>{comment.content}</i>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}

        <div css={formStyles}>
          <div>
            <form
              onSubmit={(event) => {
                return (
                  event.preventDefault(),
                  createCommentFromApiByUserId(userAccountId)
                );
              }}
            >
              <h4 css={{ marginTop: 40 }}>Leave a comment</h4>

              <textarea
                placeholder="max. 400 characters"
                css={{ width: 350 }}
                value={comment}
                onChange={(event) => {
                  setComment(event.currentTarget.value);
                }}
              />
              <br />
              <button css={commentButtonStyles} data-test-id={'comment-button'}>
                Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const recipeId = parseInt(context.query.recipeId);
  const comments = await getCommentByRecipeId(recipeId);
  const singleRecipe = await getRecipeByRecipeId(recipeId);
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));
  const ingredients = await getIngredientsByRecipeId(recipeId);

  if (!user) {
    return {
      props: {
        singleRecipe: singleRecipe,
        comments: comments,
        ingredients: ingredients,
      },
    };
  }

  return {
    props: {
      user: user,
      singleRecipe: singleRecipe,
      comments: comments,
      ingredients: ingredients,
    },
  };
}
