import { css, Global } from '@emotion/react';
import { Lobster } from '@next/font/google';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

const lobster = Lobster({ subsets: ['latin'], weight: '400' });

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profiles');
    const profileResponseBody = await profileResponse.json();

    if ('errors' in profileResponseBody) {
      setUser(undefined);
    } else {
      setUser(profileResponseBody.user);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global // global styles
        styles={css`
          *,
          *::before,
          *::after {
            text-decoration: none;
            box-sizing: border-box;
          }

          body {
            margin: 0px;
            --main-text-color: #006b4a;
          }

          h1 {
            color: var(--main-text-color);
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: 50px;
          }

          h2 {
            color: var(--main-text-color);
            display: flex;
            justify-content: center;
            text-align: center;
            font-size: 30px;
          }

          h4 {
            width: 576px;
            display: flex;
            color: var(--main-text-color);
            justify-content: left;
          }

          button {
            border: 1px solid green;
            display: inline-block;
            border-radius: 14px;
            background-color: var(--main-text-color);
            color: white;
          }
          button:hover {
            background-color: white;
            color: var(--main-text-color);
            border: 1px solid var(--main-text-color);
          }
        `}
      />
      <main className={lobster.className}>
        <Layout user={user}>
          <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
        </Layout>
      </main>
    </>
  );
}

export default MyApp;
