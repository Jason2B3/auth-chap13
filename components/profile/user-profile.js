import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/client";

export default function UserProfile() {
  // Create/manage your own loading and session states
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);
  console.log(isLoading, loadedSession);
  useEffect(() => {
    const confirmSession = async function () {
      const session = await getSession(); // falsy if we aren't logged in
      setLoadedSession(session); // update our session state
      // If getSession returns a falsy, we must not be logged in
      // In this case, redirect the visitor to to the /auth path for authentication
      if (!session) window.location.href = "/auth";
      else setIsLoading(false); // update our loading state (we're done now)
    };
    confirmSession();
  }, []);

  if (isLoading) return <p className={classes.profile}>Loading...</p>;
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}
