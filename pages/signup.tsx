import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/signup';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

const signupStyles = css`
  justify-content: center;
  text-align: center;
  padding-top: 100px;
  margin: 8% auto;
  width: 400px;
  height: 400px;
  border: 1px solid black;
  border-radius: 12px;

  > label {
    display: block;
    margin-bottom: -10px;
    /* margin-right: 20px; */
  }

  > label ~ input {
  }

  > button {
    margin-top: 30px;
    border-radius: 4px;
    width: 100px;
    border: 1px solid black;
  }
`;

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
        email,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/private-profile`);
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up new users" />
      </Head>
      <div css={signupStyles}>
        <h1>Register</h1>
        {errors.map((error) => {
          return (
            <p
              css={css`
                background-color: red;
                color: white;
                padding: 5px;
              `}
              key={error.message}
            >
              ERROR: {error.message}
            </p>
          );
        })}

        <label>
          Username
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value.toLowerCase());
            }}
          />
        </label>
        <br />
        <label>
          Password
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>
        <br />
        <label>
          E-Mail
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.currentTarget.value);
            }}
          />
        </label>
        <button
          onClick={async () => {
            await registerHandler();
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
