// "use client";

// import { signOut, useSession } from "@/lib/auth-client"; // Import your custom useSession hook
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { LogIn } from "lucide-react";

// export const UserButton = () => {
//   // Call the useSession hook to get the session data
//   const session = useSession();

//   // Extract the userId from the session
//   const userId = session?.data?.user.email;

//   return (
//     <div>
//       {!session ? (
//         <Button>
//           <Link href="/auth/login">
//             <LogIn />
//             <span>Login</span>
//           </Link>
//         </Button>
//       ) : (
//         <div>
//           <h1>{userId}</h1>
//           <button onClick={() => signOut()}>sign out</button>
//         </div>
//       )}
//     </div>
//   );
// };

// "use client";

// import { signOut, useSession } from "@/lib/auth-client"; // Import your custom useSession hook
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { LogIn } from "lucide-react";
// import { useEffect } from "react"; // Import useEffect untuk memantau perubahan sesi

// export const UserButton = () => {
//   // Call the useSession hook to get the session data
//   const { data: session,status } = useSession();

//   useEffect(() => {
//     // Memastikan komponen merender ulang setelah sesi diperbarui
//     if (status === "unauthenticated") {
//       // Memperbarui tampilan setelah signOut berhasil
//       window.location.reload();
//     }
//   }, [status]); // Ketika status sesi berubah, trigger effect ini

//   const userId = session?.data?.user.email;

//   return (
//     <div>
//       {!session ? (
//         <Button>
//           <Link href="/auth/login">
//             <LogIn />
//             <span>Login</span>
//           </Link>
//         </Button>
//       ) : (
//         <div>
//           <h1>{userId}</h1>
//           <button onClick={() => signOut()}>sign out</button>
//         </div>
//       )}
//     </div>
//   );
// };

"use client";

// import { signOut, useSession } from "@/lib/auth-client"; 
import { Button } from "../ui/button";
import Link from "next/link";
// import { Image, LogIn } from "lucide-react";
import Image from "next/image"
import { authClient } from "@/lib/auth-client";
// import { Session } from "better-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Suspense, useEffect, useState } from "react";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";




export const UserButton = ({ user }: any) => {
  // Extract userId from passed data
  const userId = user?.email;
  // console.log(userId);

  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [checked, setChecked] = useState(false)

  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true)
      case "light":
        return setChecked(false)
      case "system":
        return setChecked(false)
    }
  }

  useEffect(() => {
    setSwitchState()
  }, [])


  const handleSignOut = async () => {
    await authClient.signOut(); // Call signOut
    window.location.reload(); // Simple reload to update the UI
  };

  if(user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
        <Avatar className="w-7 h-7">
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
        <div className="mb-4 p-4 flex flex-col gap-1 items-center rounded-lg  bg-primary/10">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                className="rounded-full"
                width={36}
                height={36}
              />
            )}
            <p className="font-bold text-xs">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push("/dashboard/orders")}
            className="group py-2 font-medium cursor-pointer "
          >
            <TruckIcon
              size={14}
              className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />{" "}
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="group py-2 font-medium cursor-pointer  ease-in-out "
          >
            <Settings
              size={14}
              className="mr-3 group-hover:rotate-180 transition-all duration-300 ease-in-out"
            />
            Settings
          </DropdownMenuItem>
          {theme && (
            <DropdownMenuItem className="py-2 font-medium cursor-pointer  ease-in-out">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center group "
              >
                <div className="relative flex mr-3">
                  <Sun
                    className="group-hover:text-yellow-600  absolute group-hover:rotate-180  dark:scale-0 dark:-rotate-90 transition-all duration-750 ease-in-out"
                    size={14}
                  />
                  <Moon
                    className="group-hover:text-blue-400  scale-0 rotate-90 dark:rotate-0  dark:scale-100 transition-all ease-in-out duration-750"
                    size={14}
                  />
                </div>
                <p className="dark:text-blue-400 mr-3 text-secondary-foreground/75   text-yellow-600">
                  {theme[0].toUpperCase() + theme.slice(1)} Mode
                </p>
                <Switch
                  className="scale-75 "
                  checked={checked}
                  onCheckedChange={(e: any) => {
                    setChecked((prev) => !prev)
                    if (e) setTheme("dark")
                    if (!e) setTheme("light")
                  }}
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => handleSignOut()}
            className="py-2 group focus:bg-destructive/30 font-medium cursor-pointer "
          >
            <LogOut
              size={14}
              className="mr-3  group-hover:scale-75 transition-all duration-300 ease-in-out"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  // <div>
  //   {!user || !user.emailVerified ? (
  //     <Button asChild>
  //       <Link className="flex-gap-2" href="/auth/login">
  //         <LogIn size={16} />
  //         <span>Login</span>
  //       </Link>
  //     </Button>
  //   ) : (
  //     <div>
  //       <h1>{userId}</h1>
  //       <button onClick={handleSignOut}>Sign out</button>
  //     </div>
  //   )}
  // </div>
};