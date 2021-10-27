import { compare, hash } from "bcryptjs";

// Encrypt a password before we store it in the DB
export async function encrypt(password) {
  // the higher the num, the more secure, but the slower this function takes
  const hashed = await hash(password, 12); // 12 is considered good
  return hashed;
}

// See if arg 1's regularly typed password matches arg 2's which is encrypted
export async function verifyPassword(password, hashedVersion) {
  const isValid = await compare(password, hashedVersion);
  return isValid; // Boolean
}
