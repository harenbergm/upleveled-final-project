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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            margin: 0px;
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
