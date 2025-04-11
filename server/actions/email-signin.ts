"use server";

import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/types/login-schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { user } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./emails";
import { signIn } from "@/lib/auth-client";

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.query.user.findFirst({
        where: eq(user.email, email),
      });

      if (!existingUser) {
        return { error: "Email not found" };
      }

      // Uncomment if you want to require verification
      // if (!existingUser.emailVerifiedDate) {
      //   const verificationToken = await generateEmailVerificationToken(email);
      //   await sendVerificationEmail(
      //     verificationToken[0].email,
      //     verificationToken[0].token
      //   );
      //   return { success: "Confirmation Email Sent" };
      // }

      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { success: "Login successful!" };
    } catch (err: any) {
      console.error("Login error:", err);
      return { error: err?.message || "Something went wrong" };
    }
  });
