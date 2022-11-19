import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  padding: 15px 20px;
  border-top: 2px solid #ddd;
  background-color: lightblue;
  justify-content: center;
  gap: 5rem;
  /* position: fixed; */
  bottom: 0;
  width: 100%;

  > div > a {
    margin-right: 40px;
  }
  a:hover {
    color: white;

    > div > Link {
      gap: 20px;
    }
  }
`;

export default function Footer() {
  return (
    <footer>
      <nav css={footerStyles}>
        <div>
          <Link href="/recipes">Recipes</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </nav>
    </footer>
  );
}
