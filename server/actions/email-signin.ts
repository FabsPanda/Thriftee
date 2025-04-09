"use server";

import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/types/login-schema";
import { db } from "..";
import { eq } from "drizzle-orm";
import { user } from "../schema";

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    //cek user di database
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "Email not found" };
    }

    console.log(email, password, code);
    return { success: email };
  });
