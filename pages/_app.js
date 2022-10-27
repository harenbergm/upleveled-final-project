import { css, Global } from '@emotion/react';

// import { css } from '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
