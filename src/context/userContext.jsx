"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("furlink_user") : null;
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (user) {
          localStorage.setItem("furlink_user", JSON.stringify(user));
        } else {
          localStorage.removeItem("furlink_user");
        }
      }
    } catch {
      // ignore
    }
  }, [user]);

  const value = useMemo(() => ({ user, setUser, isAuthenticated: !!user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}