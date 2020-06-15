import React, { createContext, useContext, useCallback, useState } from "react";

import { encode } from "base-64";

import { Login_URL } from "../utils/urls";

interface AuthContextData {
  signIn(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async (email: string, password: string) => {
    const code_access = encode(`${email}:${password}`);
    console.log("chegou");
    try {
      const response = await fetch(`${Login_URL}/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Basic ${code_access}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
