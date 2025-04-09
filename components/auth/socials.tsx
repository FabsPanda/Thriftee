"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button
        variant={"outline"}
        className="flex gap-4 w-full"
        onClick={async () => {
          await signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        <p>Sign in with Google</p>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        variant={"outline"}
        className="flex gap-4 w-full"
        onClick={async () => {
          await signIn.social({
            provider: "github",
            callbackURL: "/",
          });
        }}
      >
        <p>Sign in with Github</p>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}
