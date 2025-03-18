"use client";

import {signIn} from '@/lib/auth-client'

export default function SignIn(){
    return (
      <div>
        <button
          onClick={async () => {
            await signIn.social({
              provider: "github",
              callbackURL: "/",
            });
          }}
        >
          Sign in with GitHub
        </button>
          <br />
        <button
          onClick={async () => {
            await signIn.social({
              provider: "google", 
              callbackURL: "/",
            });
          }}
        >
          Sign in with Google
        </button>

      </div>
    );
}
