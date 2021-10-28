import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/client";

export default function UserProfile() {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}
