import { useMutation } from "@tanstack/react-query";
import {
  loginWithEmail,
  loginWithPhone,
  signupWithEmail,
  signupWithPhone,
} from "@/services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => {
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
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data) => {
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
  });
};
