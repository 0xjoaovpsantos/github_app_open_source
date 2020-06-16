import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

import { encode } from "base-64";

import AsyncStorage from "@react-native-community/async-storage";

import { Login_URL } from "../utils/urls";

interface AuthContextData {
  signIn(email: string, password: string): Promise<void>;
  loading: boolean;
  codeAccess: string;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [codeAccess, setCodeAccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      setLoading(true);
      var code_access = await AsyncStorage.getItem("code_access");

      if (!!code_access) {
        setCodeAccess(code_access);
      }

      setLoading(false);
    }

    loadStorageData();
  }, [codeAccess]);

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
        setCodeAccess(code_access);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    await AsyncStorage.removeItem("code_access");
    setCodeAccess("");
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, loading, codeAccess, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
