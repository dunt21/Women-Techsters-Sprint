import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider(children): { children: ReactNode } {
  const [user, setUser] = useState(null);

  function login(userData, tokens: object) {
    setUser(userData);
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("tokens");
  }
  return null;
}
