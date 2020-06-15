import React, { createContext, useContext, useCallback, useState } from "react";

import { encode } from "base-64";

import AsyncStorage from "@react-native-community/async-storage";

import { Login_URL } from "../utils/urls";

interface AuthState {
  code_access: string;
}

interface AuthContextData {
  signIn(email: string, password: string): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);

    const code_access = encode(`${email}:${password}`);

    try {
      const response = await fetch(`${Login_URL}/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Basic ${code_access}`,
        },
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("code_access", code_access);
        setData({ code_access });
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
