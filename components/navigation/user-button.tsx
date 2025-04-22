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
import { LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
// import { Session } from "better-auth";


export const UserButton = ({ user }: any) => {
  // Extract userId from passed data
  const userId = user?.email;
  // console.log(userId);
  // Handle sign out
  const handleSignOut = async () => {
    await authClient.signOut(); // Call signOut
    window.location.reload(); // Simple reload to update the UI
  };

  return (
    <div>
      {!user ? (
        <Button asChild>
          <Link className="flex-gap-2" href="/auth/login">
            <LogIn size={16}/>
            <span>Login</span>
          </Link>
        </Button>
      ) : (
        <div>
          <h1>{userId}</h1>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
};