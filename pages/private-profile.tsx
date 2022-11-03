import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { userAgent } from 'next/server';
import {
  getUserBySessionToken,
  getUserByUsername,
  User,
} from '../database/users';

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h1>Personal Information</h1>
      id: {props.user.id}
      <br />
      username: {props.user.username} <button>Edit</button>
      <br />
      Password: ******** <button>Edit</button>
      <br />
      E-Mail-Adress: {props.user.e_mail} <button>Edit</button>
      <br />
      <br />
      <button>Delete Profile</button>
      <br />
      <h2>Create Recipe</h2>
      {console.log(props)}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userProfile = await getUserByUsername(username);

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
