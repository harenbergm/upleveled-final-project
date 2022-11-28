import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { LoginResponseBody } from './api/login';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

const loginStyles = css`
  justify-content: center;
  text-align: center;
  padding-top: 20px;
  margin: 14% auto;
  width: 350px;
  height: 380px;
  border: 1px solid #006b4a;
  border-radius: 12px;
  color: #006b4a;

  p {
    width: 300px;
    justify-content: center;
    margin: 0 auto;
    font-size: 12px;
    margin-bottom: 15px;
  }

  input {
    height: 30px;
    width: 300px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #006b4a;
  }

  button {
    height: 30px;
    width: 300px;
    font-size: 14px;
    border-radius: 20px;
    background-color: #006b4a;
    color: white;
    margin-top: 20px;
    border-radius: 8px;
    border: none;
  }
  button:hover {
    background-color: white;
    color: #007e58;
    border: 1px solid #006b4a;
  }
`;

const signupStyles = css`
  margin: 30px 35px 0px;
`;

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return console.log(loginResponseBody.errors);
    }

    console.log(router.query.returnTo);

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
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
        <title>Login</title>
        <meta name="login" content="Login to your private profile." />
      </Head>
      <div css={loginStyles}>
        <h1>Login</h1>
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
        <div>
          <input
            data-test-id={'username'}
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value.toLowerCase());
            }}
          />
          <input
            type="password"
            data-test-id={'password'}
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
          <button
            data-test-id={'login'}
            onClick={async () => {
              await loginHandler();
            }}
          >
            Login
          </button>
          <div css={signupStyles}>
            <hr />
            <span>
              Don't have an account?{' '}
              <Link href="/register">
                <b>Register here!</b>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/private-profile',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
