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
  .action(async ({ parsedInput: { email, password, code } }) => {
    try{
      const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "Email not found" };
    }

    //user not verified
    if (!existingUser.emailVerifiedDate) {
      const verificationToken = await generateEmailVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[0].token
      );
      return { success: "Confirmation Email Sent" };
    }

    // await signIn("credentials", {
    //   email,
    //   password,
    //   redirectTo: "/",
    // });

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      // return { success: true };
    } catch (err: any) {
      return { error: err.message || "Something went wrong" };
    }
    

    return { success: email };
    }catch(error){
      console.log(error);
    }
    
  });
