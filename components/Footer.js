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
  }:hover {
      color: white;


  > div > Link {
    gap: 20px;
  }
`;

export default function Footer() {
  return (
    <footer>
      <nav css={navStyles}>
        <div>
          <Link href="/show-recipes">Show Recipes</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </nav>
    </footer>
  );
}
