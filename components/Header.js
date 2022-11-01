import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  margin-top: 20px;
  padding: 10px 100px;
  display: flex;
  justify-content: center;

  > div > a {
    margin-left: 40px;
    text-transform: uppercase;
  }
  :hover {
    color: #e04326;
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
          <Link href="/show-recipes">Show Recipes</Link>
          <Link href="/private-profile">Private Profile</Link>
          <Link href="/login">Login</Link>
          <Link href="/logout">Logout</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}
