import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
// import { userAgent } from 'next/server';
import { useState } from 'react';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user: User;
};

export default function UserProfile(props: Props) {
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.eMail);

  console.log('props.user.username', props.user.username);

  async function updateUserFromApiById(id: number) {
    const response = await fetch(`/api/profile/${id}`, {
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
      <h1>Private Profile</h1>
      Account ID: {props.user.id}
      <br />
      <h2>Personal Information</h2>
      <form>
        <label>
          Username:
          <input
            value={username}
            onChange={(event) => {
              setUsername(event?.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          E-Mail:
          <input
            value={email}
            onChange={(event) => {
              setEmail(event?.currentTarget.value);
            }}
          />
          <br />
          <br />
          <button
            onClick={() => {
              updateUserFromApiById(props.user.id);
            }}
          >
            Save Changes
          </button>
        </label>
      </form>
      <br />
      {console.log('user', props.user)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button>Delete Profile</button>
      <br />
      <h2>Create Recipe</h2>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    props: { user },
  };
}
