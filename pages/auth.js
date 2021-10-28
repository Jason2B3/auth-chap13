import { signIn, getSession } from "next-auth/client";
import AuthForm from "../components/auth/auth-form";

export async function getServerSideProps(context) {
  // session = falsy if we aren't logged in, and equals a session obj if we are
  const session = await getSession({ req: context.req });
  // If the user is not logged in, redirect them to "/profile"
  if (session) {
    return {
      redirect: {
        destination: "/profile", // redirect to this path
        permanent: false, // don't always want to redirect (only if user's not logged in)
      },
    };
  }
  // If the user is logged in, don't redirect
  // Just pass the session through props in case <UserProfile> needs it
  return { props: { session } };
}

function AuthPage() {
  return <AuthForm />;
}

export default AuthPage;
