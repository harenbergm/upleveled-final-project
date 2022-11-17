import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import { getRecipeById } from '../../database/recipes';
import { getUserBySessionToken } from '../../database/users';
import { getCommentByRecipeId } from '../../database/recipecomments';

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
          <div>
            <div>
              <h1>Title: {props.singleRecipe[0].recipesTitle}</h1>
            </div>
            <div>ID: {props.singleRecipe[0].id}</div>
            <div>
              Preparation Time: {props.singleRecipe[0].preparationTime} Minutes
            </div>
            <p>Difficulty: {props.singleRecipe[0].difficultyName}</p>
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
          <hr />
          {props.comments ? (
            props.comments.map((comment) => {
              return (
                <div>
                  <div>
                    Username: {comment.userName} on {comment.date}
                    <br />
                    <span>
                      <i>"{comment.content}"</i>
                    </span>
                    <br />
                  </div>
                  <br />
                </div>
              );
            })
          ) : (
            <hr />
          )}
          <hr />
          <form
            onSubmit={(event) => {
              return (
                event.preventDefault(),
                createCommentFromApiByUserId(userAccountId)
              );
            }}
          >
            <h4>Leave a comment (max. 400 chars)</h4>
            <input
              value={comment}
              onChange={(event) => {
                setComment(event.currentTarget.value);
              }}
            />
            <button css={backButtonStyles}>Comment</button>
          </form>
        </div>
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
