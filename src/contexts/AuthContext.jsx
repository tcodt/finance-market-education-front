"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginWithEmail,
  loginWithPhone,
  signupWithEmail,
  signupWithPhone,
  logout as logoutUser,
} from "@/services/auth.service";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState({
    access: null,
    refresh: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------------------------------------
  //     Load token from localStorage (on refresh)
  // -----------------------------------------------------
  useEffect(() => {
    const savedAccess = localStorage.getItem("access_token");
    const savedRefresh = localStorage.getItem("refresh_token");
    const savedUser = localStorage.getItem("user");

    if (savedAccess && savedRefresh) {
      setTokens({ access: savedAccess, refresh: savedRefresh });
      setIsAuthenticated(true);
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // -----------------------------------------------------
  //     Login Mutation
  // -----------------------------------------------------
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      if (data.loginMethod === "email") {
        return loginWithEmail({
          email: data.email,
          password: data.password,
        });
      }
      return loginWithPhone({
        phone_number: data.phone_number,
        password: data.password,
      });
    },

    onMutate: () => {
      setIsLoadingGlobal(true);
      setError(null);
    },

    onSuccess: (res) => {
      setTokens({
        access: res.access,
        refresh: res.refresh,
      });

      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);

      setUser(res.user || null);
      localStorage.setItem("user", JSON.stringify(res.user || null));
      setIsAuthenticated(true);

      setIsLoadingGlobal(false);
    },

    onError: (err) => {
      setIsLoadingGlobal(false);
      setError(err);
    },
  });

  // -----------------------------------------------------
  //     Signup Mutation
  // -----------------------------------------------------
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      if (data.signupMethod === "email") {
        return signupWithEmail({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
        });
      }

      return signupWithPhone({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        password: data.password,
      });
    },

    onMutate: () => {
      setIsLoadingGlobal(true);
      setError(null);
    },

    onSuccess: (res) => {
      setTokens({
        access: res.access,
        refresh: res.refresh,
      });

      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);

      setUser(res.user || null);
      localStorage.setItem("user", JSON.stringify(res.user || null));
      setIsAuthenticated(true);

      setIsLoadingGlobal(false);
    },

    onError: (err) => {
      setIsLoadingGlobal(false);
      setError(err);
    },
  });

  // -----------------------------------------------------
  //     Exposed Methods
  // -----------------------------------------------------
  const login = async (data) => {
    setError(null);
    await loginMutation.mutateAsync(data);
  };

  const signup = async (data) => {
    setError(null);
    await signupMutation.mutateAsync(data);
  };

  const logout = async () => {
    const token = localStorage.getItem("refresh_token");

    try {
      await logoutUser(token);
    } catch (error) {
      console.error(
        "Logout request failed (token expired or other issue), proceeding with client cleanup:",
        error
      );
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated,
        isLoadingGlobal,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
