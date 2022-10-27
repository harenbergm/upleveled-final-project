import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  margin-top: 20px;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 10;

  > div > a {
    margin-left: 40px;
  }

  > div > a {
    text-transform: uppercase;
    :hover {
      color: #e04326;
    }
  }

  > div > Link {
    gap: 20px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <div></div>
        <div>
          <Link href="/">HOME</Link>
          <Link href="/api/login">Login</Link>
          <Link href="/api/sign-up">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}
