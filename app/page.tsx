import SignIn from "@/components/sign-up";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="text-4xl">
      <h1>Homepage as</h1>
      {/* <Button>Click me</Button> */}
      <SignIn/>
    </main>
  );
}
