import { css } from '@emotion/react';
import Link from 'next/link';

// const headerStyles = css`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   margin-top: 20px;
//   padding: 15px 20px;
//   border-top: 2px solid #ddd;
//   background-color: lightblue;
//   justify-content: center;
//   gap: 5rem;
//   position: fixed;
//   bottom: 0;
//   width: 100%;

//   > div > a {
//     margin-right: 40px;
//   }
//   a:hover {
//     color: white;

//     > div > Link {
//       gap: 20px;
//     }
//   }
// `;

const navStyles = css`
  padding: 10px 100px 20px;
  font-weight: 600;
  margin-bottom: -45px;
  display: flex;
  color: white;
  justify-content: space-between;
  background-color: lightblue;
  > div > a {
    margin-left: 40px;
  }
  a {
    color: black;
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
          <Link href="/">Logo</Link>
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
