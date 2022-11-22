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
  padding-top: 20px;
  margin: 14% auto;
  width: 350px;
  height: 380px;
  border: 1px solid #007e58;
  border-radius: 12px;
  color: #007e58;

  p {
    width: 300px;
    justify-content: center;
    margin: 0 auto;
    font-size: 12px;
    margin-bottom: 15px;
    color: black;
  }

  input {
    height: 30px;
    width: 300px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #007e58;
  }

  button {
    height: 30px;
    width: 300px;
    font-size: 14px;
    border-radius: 20px;
    background-color: #007e58;
    color: white;
    margin-top: 20px;
    border-radius: 8px;
    border: 1px solid black;
  }
  button:hover {
    background-color: white;
    color: #007e58;
    border: 1px solid #007e58;
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
        <div>LOGO</div>
        <h1>Register</h1>
        <p>By creating an account you are accepting our cookie policy.</p>
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

        <input
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value.toLowerCase());
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
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
