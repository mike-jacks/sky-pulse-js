"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import LoginMain from "./LoginMain";

export default function LoginCheck({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {

      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setHasCheckedLogin(true);
    }
  }, []);

  if (!hasCheckedLogin) {
    return null;
  }

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
  }

  return (
    <div className={!isLoggedIn ? "min-h-screen flex items-center justify-center" : ""}>
      {isLoggedIn && (
        <Dashboard handleLogout={handleLogout}>
          <main>{children}</main>
        </Dashboard>
      )}
      {!isLoggedIn && <LoginMain handleLogin={handleLogin}/>}
    </div>
  );
}
