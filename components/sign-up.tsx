"use client";

import {signIn} from '@/lib/auth-client'

export default function SignIn(){
    return(
        <button onClick={async()=>{
            await signIn.social({
              provider: "github",
              callbackURL: "/",
            });
        }}>
            Sign in with github
        </button>
    )
}