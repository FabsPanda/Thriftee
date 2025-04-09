"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { user, verification } from "../schema";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verification.findFirst({
      where: eq(verification.token, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(verification).where(eq(verification.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(verification)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return verificationToken;
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByEmail(token);
  if (!existingToken) return { error: "Token not found" };
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, existingToken.email),
  });
  if (!existingUser) return { error: "Email does not exist" };
  await db
    .update(user)
    .set({
      emailVerifiedDate: new Date(),
    })
    .where(eq(user.email, existingToken.email));

  await db.delete(verification).where(eq(verification.id, existingToken.id));
  return { success: "Email Verified" };
};
