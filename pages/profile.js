import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

export async function getServerSideProps(context) {
  // session = falsy if we aren't logged in, and equals a session obj if we are
  const session = await getSession({ req: context.req });
  console.log(session) 
  // If the user is not logged in, redirect them to "/auth"
  if (!session) {
    return {
      redirect: {
        destination: "/auth", // redirect to this path
        permanent: false, // don't always want to redirect (only if user's not logged in)
      },
    };
  }
  // If the user is logged in, don't redirect
  // Just pass the session through props in case <UserProfile> needs it
  return { props: { session } };
}

export default function ProfilePage({session}) {
  console.log(Date.parse(session.expires)) // unix expiry time
  return <UserProfile />;
}


