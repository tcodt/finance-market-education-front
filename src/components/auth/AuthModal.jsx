"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, signupSchema } from "@/lib/validations/auth";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Phone, ArrowRight } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AuthModal({
  isOpen,
  onClose,
  isSignUpDefault,
  logoutMode = false,
}) {
  // ---------------------------
  //  ALL HOOKS MUST ALWAYS RUN
  // ---------------------------
  const [authMethod, setAuthMethod] = useState("email");
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [step, setStep] = useState("auth");
  const [verificationCode, setVerificationCode] = useState("");

  const { login, signup, logout } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: {
      loginMethod: "email",
      signupMethod: "email",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = form;

  // When auth method changes, update hidden field
  useEffect(() => {
    setValue(isSignUp ? "signupMethod" : "loginMethod", authMethod);
  }, [authMethod, isSignUp, setValue]);

  // Reset entire form when switching methods or modes
  useEffect(() => {
    reset();
  }, [authMethod, isSignUp, reset]);

  // Reset modal when closed
  useEffect(() => {
    if (!isOpen) {
      reset();
      setVerificationCode("");
      setStep("auth");
      setAuthMethod("email");
      setIsSignUp(isSignUpDefault);
    }
  }, [isOpen, reset, isSignUpDefault]);

  // Sync default signup mode whenever modal opens
  useEffect(() => {
    if (isOpen) setIsSignUp(isSignUpDefault);
  }, [isOpen, isSignUpDefault]);

  // ---------------------------
  //  SUBMIT HANDLER
  // ---------------------------
  const onSubmit = async (data) => {
    if (authMethod === "phone") {
      delete data.email;
      data.loginMethod = "phone";
      data.signupMethod = "phone";
    } else {
      delete data.phone_number;
      data.loginMethod = "email";
      data.signupMethod = "email";
    }

    try {
      if (isSignUp) {
        await signup(data);
        toast.success("ثبت‌نام موفقیت‌آمیز بود!");
        onClose();
      } else {
        await login(data);
        toast.success("ورود موفقیت‌آمیز بود!");
        onClose();
      }
    } catch (err) {
      console.log("AUTH ERROR:", err);

      const res = err?.response;
      const data = res?.data;

      // اگر هیچ دیتایی در پاسخ نبود
      if (!data) {
        return toast.error("مشکلی پیش آمد. لطفا دوباره تلاش کنید.");
      }

      // -----------------------------
      //  DRF / Django Validation Errors
      // -----------------------------
      if (typeof data === "object") {
        // مثال:
        // { email: ["کاربر با این ایمیل از قبل موجود است."] }
        for (const field in data) {
          const msg = data[field];

          // اگر آرایه بود (ساختار استاندارد DRF)
          if (Array.isArray(msg) && msg.length > 0) {
            return toast.error(msg[0]); // یک پیام کافی است
          }

          // اگر استرینگ بود
          if (typeof msg === "string") {
            return toast.error(msg);
          }
        }
      }

      // Handle server errors (5xx)
      if (err?.response?.status >= 500) {
        return toast.error("خطای سرور. لطفا بعداً دوباره تلاش کنید.");
      }

      // -----------------------------
      //  SIGNUP specific errors (fallback)
      // -----------------------------
      const message =
        data?.error || data?.detail || data?.message || err?.message;

      if (isSignUp) {
        if (String(message).includes("exists")) {
          return toast.error("این کاربر قبلاً ثبت‌نام کرده است!");
        }
      }

      // -----------------------------
      //  FINAL fallback
      // -----------------------------
      toast.error(message || "خطایی رخ داد. دوباره تلاش کنید.");
    }
  };

  // ---------------------------
  //  RENDER
  // ---------------------------
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md" dir="rtl">
        {logoutMode ? (
          /* ----------------------------------------------------
           * LOGOUT CONFIRMATION UI
           * ---------------------------------------------------- */
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">
                خروج از حساب؟
              </DialogTitle>
            </DialogHeader>

            <p className="text-center text-gray-600">
              آیا مطمئن هستید که می‌خواهید خارج شوید؟
            </p>

            <div className="flex gap-3 pt-6">
              <Button className="flex-1 bg-gray-400" onClick={() => onClose()}>
                لغو
              </Button>

              <Button
                className="flex-1 bg-[#E45858] text-white"
                onClick={() => {
                  logout();
                  toast.success("با موفقیت خارج شدید.");
                  onClose();
                  router.push("/home");
                }}
              >
                خروج
              </Button>
            </div>
          </>
        ) : step === "verification" ? (
          /* ----------------------------------------------------
           * VERIFICATION STEP
           * ---------------------------------------------------- */
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                تایید کد
              </DialogTitle>
            </DialogHeader>

            <button
              type="button"
              onClick={() => setStep("auth")}
              className="flex items-center gap-2 text-[#8B8B8B]"
            >
              <span>بازگشت</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <p className="text-[#1A1A1A]">کد تایید ارسال شد</p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
              >
                <InputOTPGroup className="flex flex-row-reverse">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              disabled={verificationCode.length !== 6}
              className="w-full bg-[#E45858] text-white py-6"
            >
              تایید کد
            </Button>
          </>
        ) : (
          /* ----------------------------------------------------
           * LOGIN / SIGNUP FORM
           * ---------------------------------------------------- */
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-[#1A1A1A]">
                {isSignUp ? "ثبت‌نام" : "ورود"}
              </DialogTitle>
            </DialogHeader>

            {/* METHOD SWITCH */}
            <div className="flex gap-2 p-1 bg-[#F5EDE3] rounded-xl">
              <button
                type="button"
                onClick={() => setAuthMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg ${
                  authMethod === "email"
                    ? "bg-white text-[#E45858] shadow-sm font-medium"
                    : "text-[#8B8B8B]"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>ایمیل</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg ${
                  authMethod === "phone"
                    ? "bg-white text-[#E45858] shadow-sm font-medium"
                    : "text-[#8B8B8B]"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>شماره موبایل</span>
              </button>
            </div>

            {/* FORM */}
            <form
              key={`${isSignUp}-${authMethod}`}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 py-4"
            >
              <div className="space-y-4">
                {/* Signup extra fields */}
                {isSignUp && (
                  <>
                    <div>
                      <Label>نام</Label>
                      <Input
                        {...register("first_name")}
                        className="text-right"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>نام خانوادگی</Label>
                      <Input
                        {...register("last_name")}
                        className="text-right"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Email / phone field */}
                {authMethod === "email" ? (
                  <div>
                    <Label>ایمیل</Label>
                    <Input
                      {...register("email")}
                      type="email"
                      className="text-right"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <Label>شماره موبایل</Label>
                    <Input
                      {...register("phone_number")}
                      type="tel"
                      className="text-right"
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-sm">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div>
                  <Label>رمز عبور</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className="text-right"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#E45858] text-white py-6"
              >
                {isSignUp ? "ثبت‌نام" : "ورود"}
              </Button>

              {/* Switch mode */}
              <div className="text-center text-sm">
                {isSignUp ? (
                  <p className="text-[#8B8B8B]">
                    قبلاً ثبت‌نام کرده‌اید؟{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-[#E45858]"
                    >
                      وارد شوید
                    </button>
                  </p>
                ) : (
                  <p className="text-[#8B8B8B]">
                    حساب کاربری ندارید؟{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-[#E45858]"
                    >
                      ثبت‌نام کنید
                    </button>
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
