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

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Link href="/">HOME</Link>
          <Link href="/show-recipes">Show Recipes</Link>
          <Link href="/private-profile">Private Profile</Link>
        </div>
        <div>
          {props.user && props.user.username}
          {props.user ? (
            <Anchor
              css={css`
                margin-left: 30px;
              `}
              href="/logout"
            >
              Logout
            </Anchor>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/logout">Logout</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
