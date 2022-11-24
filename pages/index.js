import { css } from '@emotion/react';
import Head from 'next/head';

export default function Home() {
  const homeStyles = css`
    justify-content: center;
    text-align: center;
    position: relative;

    h1 {
      padding-top: 20%;
      font-size: 64px;
      color: #006b4a;
    }

    h2 {
      font-size: 48px;
      color: #006b4a;
    }

    button {
      border-radius: 18px;
      width: 200px;
      padding: 8px;
      font-size: 16px;
      background-color: #006b4a;
      color: white;
      border: 1px solid white;
    }
    button:hover {
      background-color: white;
      color: #007e58;
      border: 1px solid #007e58;
    }
  `;

  return (
    <div>
      <Head>
        <title>Nasch - Get your delicours recipes daily</title>
        <meta
          name="description"
          content="Find and share recipes with like-minded people"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={homeStyles}>
          <div
            style={{
              zIndex: -100,
              position: 'fixed',
              width: '100vw',
              height: '100vh',
            }}
          >
            <img src={'/homepage-hero-image.png'} width="100%" height="100%" />
          </div>
          <div>
            <h1>Nasch</h1>
            <h2>Get new delicious recipes every day</h2>

            <a href="/recipes">
              <button>Show Recipes</button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
