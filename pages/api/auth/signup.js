import { connectToDatabase } from "../../../helpers/db";
import { hashPW } from "../../../helpers/auth";
//# API Route file
export default async function handler(req, res) {
  if ((req.method = "POST")) {
    // Extract data from the request body
    const { email, password } = req.body;
    const hashedPassword = await hashPW(password); // hash the password before storage
    // Access db instance
    const client = await connectToDatabase();
    const db = client.db();
    // Check if a user with the submitted email exists already
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res
        .status(422)
        .json({ message: "Account with this email exists already" });
      client.close();
      return;
    }
    // Enter the "users" collection to make a new account doc
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword, // is hashed before insertion
    });
    client.close();
    res.status(201).json({ message: "Created user!" });
    //! WARNING: No error handling here yet
  }
}
