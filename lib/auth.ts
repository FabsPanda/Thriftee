import {db} from '@/server'
import {betterAuth, BetterAuthOptions} from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {

  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/github",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/google",
    },
    
  },
  // user: {
  //   additionalFields: {
  //     premium: {
  //       type: "boolean",
  //       required: false,
  //     },
  //   },
  // },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true
  }
} satisfies BetterAuthOptions );