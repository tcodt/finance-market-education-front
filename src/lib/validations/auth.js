import { z } from "zod";

export const signupSchema = z.object({
  first_name: z.string().min(2, "نام حداقل باید 2 کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی حداقل باید 2 کاراکتر باشد"),

  // فقط یکی از اینها باید باشد
  email: z.string().email("فرمت ایمیل صحیح نیست").optional().or(z.literal("")),
  phone_number: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
    .optional()
    .or(z.literal("")),

  password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
});

export const loginSchema = z.object({
  email: z.string().email("فرمت ایمیل صحیح نیست").optional().or(z.literal("")),
  phone_number: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
    .optional()
    .or(z.literal("")),

  password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد"),
});
