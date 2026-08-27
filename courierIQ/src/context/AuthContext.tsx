/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext } from "react";

import type { ReactNode } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("user");

    return userInfo ? JSON.parse(userInfo) : null;
  });

  function login(userData, tokens: object) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
  }

  console.log(user);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
