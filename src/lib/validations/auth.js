import { z } from "zod";

export const loginSchema = z
  .object({
    loginMethod: z.enum(["email", "phone"]),
    email: z.string().email("ایمیل معتبر نیست").optional(),
    phone_number: z
      .string()
      .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
      .optional(),
    password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
  })
  .superRefine((data, ctx) => {
    if (data.loginMethod === "email" && !data.email) {
      ctx.addIssue({
        path: ["email"],
        message: "ایمیل الزامی است",
        code: "custom",
      });
    }
    if (data.loginMethod === "phone" && !data.phone_number) {
      ctx.addIssue({
        path: ["phone_number"],
        message: "شماره موبایل الزامی است",
        code: "custom",
      });
    }
  });

export const signupSchema = z
  .object({
    signupMethod: z.enum(["email", "phone"]),
    first_name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
    last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
    email: z.string().email("ایمیل معتبر نیست").optional(),
    phone_number: z
      .string()
      .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
      .optional(),
    password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
  })
  .superRefine((data, ctx) => {
    if (data.signupMethod === "email" && !data.email) {
      ctx.addIssue({
        path: ["email"],
        message: "ایمیل الزامی است",
      });
    }
    if (data.signupMethod === "phone" && !data.phone_number) {
      ctx.addIssue({
        path: ["phone_number"],
        message: "شماره موبایل الزامی است",
      });
    }
  });
