/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext } from "react";

import type { ReactNode } from "react";

const AuthContext = createContext<any>(null);

interface userDataType {
  name?: string;
  email?: string;
  password?: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) return JSON.parse(sessionUser);

    const localUser = localStorage.getItem("user");
    if (localUser) return JSON.parse(localUser);

    return null;
  });

  function login(
    userData: userDataType,
    tokens?: object,
    rememberMe?: boolean,
  ) {
    setUser(userData);

    if (rememberMe === true) {
      localStorage.setItem("rememberMe", "true");

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("tokens", JSON.stringify(tokens));
    }
    if (rememberMe === false) {
      sessionStorage.setItem("rememberMe", "true");
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("tokens", JSON.stringify(tokens));
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tokens");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
