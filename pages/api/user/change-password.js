//# API Route that allows the authenticated to change their account password
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../helpers/db";
import { hashPW, verifyPassword } from "../../../helpers/auth";
export default async function handler(req, res) {
  // Only let this run if a user makes a PATCH request
  if (req.method !== "PATCH") return;
  // If we're not logged in, return an error status num and a JSON message
  const session = await getSession({ req: req }); // equals falsy if logged off
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  } // Past this point, the users are confirmed to be logged in
  // Grab the old and new password form submissions
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  // Grab the current logged in email
  // only works b/c of [...nextAuth].js: return { email: user.email } at end
  const userEmail = session.user.email;
  // Check the db for an account with the exact userEmail we have
  const client = await connectToDatabase();
  const db = client.db();
  const userAccount = await db
    .collection("users")
    .findOne({ email: userEmail }); // equals falsy if we can't find it

  if (!userAccount) {
    res.status(405).json({ message: "Something went wrong!" });
    return; // if account's not found, end the route here
  }
  // If we find it, compare our oldPassword submission to the hashed db one
  const passwordsMatch = await verifyPassword(
    oldPassword,
    userAccount.password
  ); // T/F
  if (!passwordsMatch) {
    res.status(408).json({ message: "Old password is not correct" });
    return; // if password's wrong, end the route here
  }
  // If passwords match, hash the newPassword and replace the old one
  const hashedNewPassword = await hashPW(newPassword);
  console.log(hashedNewPassword) // aparently an object
  await db
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: hashedNewPassword } });
  client.close();
  res.status(200).json({ message: "Password updated!" });
  return;
}
// WARNING: we did not include error handling for any of the mongodb commands
