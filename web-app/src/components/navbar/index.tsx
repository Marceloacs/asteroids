"use client";

import SignIn from "@/features/sign-in";
import useAuth from "@/hooks/use-auth";
import { Button } from "../ui/button";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="bg-white min-h-16">
      <nav className="fixed bg-transparent bg-opacity-50 backdrop-blur-sm top-0 left-0 right-0 z-50 w-full flex justify-between items-center p-4">
        <div className="container mx-auto flex justify-between items-center gap-4">
          <h1 className="text-1xl font-bold italic">Asteroids Index</h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex flex-col items-start ">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs">
                  {Intl.DateTimeFormat("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(user.createdAt))}
                </p>
              </div>
            )}
            {!user && (
              <p className="text-sm">
                Sign in to manage your favorite asteroids
              </p>
            )}
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <SignIn>
                <Button>Sign In</Button>
              </SignIn>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
