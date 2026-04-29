"use client";

import { useAuth, SignIn } from "@clerk/nextjs";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SignIn />
      </div>
    );
  }

  return <>{children}</>;
}