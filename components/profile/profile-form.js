import React, { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  // Define refs to place the field inputs into our PATCH request
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const changeHandler = async function (e) {
    e.preventDefault();
    // Make a PATCH request to change-password.js's API route
    const response = await fetch(`/api/user/change-password`, {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // Use this to see the JSON message we get back
    console.log(await response.json()); 
  };
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={changeHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
