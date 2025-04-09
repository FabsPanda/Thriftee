"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { verification } from "../schema";

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
