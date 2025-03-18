'use client';

import { useSession } from '@/lib/auth-client'; // Import your custom useSession hook

export const UserButton = () => {
  // Call the useSession hook to get the session data
  const session = useSession();

  // Extract the userId from the session
  const userId = session?.data?.user.email;

  return (
    <div>
      <h1>{userId}</h1>
    </div>
  );
};