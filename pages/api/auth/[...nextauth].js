import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

export default NextAuth({
  session: { jwt: true }, // enable JWT's
  providers: [
    Providers.Credentials({
      // This async FN runs when we get a login request
      // Place your own verification logic inside
      async authorize(credentials) {
        // Connect to the database and grab hold of the db instance
        const client = await connectToDatabase();
        const db = client.db();
        // Search the users collection for a doc/account with the submitted email
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });
        // If an account is not found, throw an error
        // Will redirect user to a new page by default, but we can override th
        if (!user) {
          client.close();
          throw new Error("No user found for that email");
        }
        // If an account is found, check if the associated password's correct
        // Compare the login attempt password to the encrypted one in MongoDB
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        // If the passwords do not match, throw an error and close the db session
        if (!isValid) {
          client.close();
          throw new Error("Incorrect password");
        }
        // If password match, the operation's a success so return an object
        client.close();
        return { email: user.email }; // USE TO ACCESS THE CURRENTLY LOGGED IN EMAIL
        // Place the user email inside- not the entire user obj (insecure)
      },
    }),
  ],
});

/* What the following line does for us:    return { email: user.email };
IN OUR BACKEND CODE, WE CAN ACCESS THE EMAIL WE'RE CURRENTLY LOGGED IN WITH
const session = await getSession({ req: req });
*/