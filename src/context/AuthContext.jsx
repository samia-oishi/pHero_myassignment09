import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribe to firebase auth state
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
