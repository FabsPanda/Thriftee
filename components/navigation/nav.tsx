// "use client";

import { auth } from "@/lib/auth";
import { UserButton } from "./user-button";

export default async function Nav() {
  // const session = auth;

  return (
    <header className="bg-slate-500 py-4">
      <nav>
        <ul className="flex justify-between">
          <li>Logo</li>
          <li>
            
            <UserButton/>
          </li>
        </ul>
      </nav>
    </header>
  );
}
