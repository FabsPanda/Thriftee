import { createAuthClient } from "better-auth/react";

export const {signIn, signOut, signUp, useSession} = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!
})

// const authClient = createAuthClient();

// export const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "github",
//   });
// };