import { create } from 'domain';
import { createAuthClient } from "better-auth/react";

export const {signIn, signOut, signUp, useSession} = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!
})


// export const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "github",
//   });
// };

// const authClient = createAuthClient();
// const { data, error } = await authClient.signIn.email({
//     email: "email@email.com",
//     password: "password1234"
// })