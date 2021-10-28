import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();
  // console.log("session:", session);
  // console.log("loading:", loading);

  // Clear the JWT cookie that keep the user logged in
  const logoutHandler = () => signOut();
  // this function also returns a promise, but we don't need to await it
  // useSession variables change as soon as this fires off anyway
  // CONDITIONAL JSX BASED ON getSession()
  let loginStatus;
  if (!session) loginStatus = "signed off";
  if (session && !loading) loginStatus = "logged in";

  // Only show the login link if we are not logged in already
  // Only show the Profile and Logout links when we are logged in
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>{loginStatus}</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && !loading && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && !loading && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
