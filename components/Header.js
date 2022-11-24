import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  padding: 10px 100px 20px;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: -45px;
  display: flex;
  color: white;
  justify-content: space-between;
  background-color: #97afb9;
  > div > a {
    margin-left: 40px;
  }
  a {
    color: white;
  }

  > div > Link {
    gap: 20px;
  }

  > div:first-child {
    justify-content: left;
  }
`;

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        {/* Using a Link component is faster than an <a> tag */}
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          <Link href="/recipes">Recipes</Link>
          <Link href="/create-recipe">Create Recipe</Link>
        </div>
        <div>
          {/* {props.user && props.user.username} */}

          {props.user ? (
            <>
              <Link href="/login">Private Profile</Link>
              <Anchor
                data-test-id={'logout'}
                css={css`
                  margin-left: 30px;
                `}
                href="/logout"
              >
                Logout
              </Anchor>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
