import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession, getSession } from "next-auth/client";

export default function UserProfile() {
  const [session, loading] = useSession();
  console.log("session:", session);
  console.log("loading:", loading);
  if (loading) return <p className={classes.profile}>Loading...</p>;
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}


