import Link from "next/link";
import { UserButton } from "./user-button";
// import { useSession } from "@/lib/auth-client";
import Logo from "@/components/navigation/logo";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Nav() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  // if(!session) {
  //   return redirect('/auth/login');
  // }

  return (
    <header className="py-8">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link href={"/"}><Logo/></Link>
          </li>
          <li>
            <UserButton user={session?.user} />
          </li>
        </ul>
      </nav>
    </header>
  );
}