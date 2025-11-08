"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("furlink_user") : null;
      console.log('userContext: Loading user from localStorage:', stored);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      console.log('userContext: Error parsing user from localStorage');
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (user) {
          console.log('userContext: Saving user to localStorage:', user);
          localStorage.setItem("furlink_user", JSON.stringify(user));
        } else {
          console.log('userContext: Removing user from localStorage');
          localStorage.removeItem("furlink_user");
        }
      }
    } catch {
      console.log('userContext: Error saving user to localStorage');
      // ignore
    }
  }, [user]);

  // Listen for logout events
  useEffect(() => {
    const handleLogout = () => {
      console.log('userContext: Received logout event, clearing user');
      setUser(null);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('userLogout', handleLogout);
      return () => window.removeEventListener('userLogout', handleLogout);
    }
  }, []);

  const value = useMemo(() => ({ user, setUser, isAuthenticated: !!user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}