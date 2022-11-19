import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import { getCommentByRecipeId } from '../../database/recipecomments';
import { getRecipeById } from '../../database/recipes';
import { getUserBySessionToken } from '../../database/users';

const backButtonStyles = css`
  margin-top: 30px;
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

const commentButtonStyles = css`
  border-radius: 4px;
  width: 80px;
  background-color: green;
  color: white;
  :hover {
    background-color: white;
    color: green;
  }
`;

const recipeStyles = css`
  img {
    display: block;
    margin: auto;
  }
  div {
    display: flex;
    justify-content: center;
  }

  h4 {
    width: 576px;
    display: flex;
    justify-content: right;
  }

  div > span {
    margin-top: 10px;
    margin-right: 5px;
  }

  p {
    display: flex;
    justify-content: center;
  }
  #preparation {
    width: 576px;
    margin-bottom: 30px;
  }
`;

const formStyles = css`
  margin-left: 470px;
  div {
    display: block;
    justify-content: right;
    margin: 0 auto;
  }
`;

export default function ShowSingleRecipe(props) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const [comment, setComment] = useState('');
  const userAccountId = props.user.id;
  const recipeId = props.singleRecipe[0].id;
  const username = props.user.username;
  // console.log('user', props.user);

  // creates comment
  async function createCommentFromApiByUserId(userAccountId) {
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
        <div>
          <div>
            <a href="/recipes">
              <button css={backButtonStyles}> 🠔 Back</button>
            </a>
          </div>
          <div css={recipeStyles}>
            <div>
              <div>
                <div>
                  <h1>{props.singleRecipe[0].recipesTitle}</h1>
                </div>
              </div>
              <div>ID: {props.singleRecipe[0].id}</div>
            </div>
            <img
              src={`${props.singleRecipe[0].imageurl}`}
              width="576"
              height="432"
              css={css`
                border-radius: 12px;
              `}
            />
            <div>
              <span>
                Preparation Time: {props.singleRecipe[0].preparationTime}{' '}
                Minutes |
              </span>
              <span> Difficulty: {props.singleRecipe[0].difficultyName}</span>
            </div>
            <p>Ingredients: {props.singleRecipe[0].ingredientsName}</p>
            <h4>Preparation:</h4>
            <div>
              <div id="preparation">{props.singleRecipe[0].instruction}</div>
            </div>
            <hr width="576" />
          </div>
        </div>
      </div>

      {props.comments ? (
        props.comments.map((comment) => {
          return (
            <div css={{ marginLeft: 470 }}>
              <p>
                <b>
                  {comment.userName} on {comment.date}
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
        <form
          onSubmit={(event) => {
            return (
              event.preventDefault(),
              createCommentFromApiByUserId(userAccountId)
            );
          }}
        >
          <h4 css={{ marginTop: 40 }}>Leave a comment (max. 400 chars)</h4>

          <textarea
            css={{ width: 350 }}
            value={comment}
            onChange={(event) => {
              setComment(event.currentTarget.value);
            }}
          />
          <br />
          <button css={commentButtonStyles}>Comment</button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const recipeId = parseInt(context.query.recipeId);
  const comments = await getCommentByRecipeId(recipeId);
  const singleRecipe = await getRecipeById(recipeId);
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));

  return {
    props: {
      user: user,
      singleRecipe: singleRecipe,
      comments: comments,
      // allIngredients: allIngredients,
    },
  };
}
