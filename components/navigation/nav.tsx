import Link from "next/link";
import { UserButton } from "./user-button";
import { useSession } from "@/lib/auth-client";
import Logo from "@/components/navigation/logo";

export default async function Nav() {
  // const session = auth;

  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link href={"/"}><Logo/></Link>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}