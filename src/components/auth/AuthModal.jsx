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

export default function AuthModal({ isOpen, onClose, isSignUpDefault }) {
  const [authMethod, setAuthMethod] = useState("email"); // email | phone
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [step, setStep] = useState("auth");
  const [verificationCode, setVerificationCode] = useState("");

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
  } = form;

  const { login, signup } = useAuth();

  useEffect(() => {
    setValue(isSignUp ? "signupMethod" : "loginMethod", authMethod);
  }, [authMethod, isSignUp, setValue]);

  // Reset form inputs if modal is closed
  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setVerificationCode("");
      setStep("auth");
      setAuthMethod("email");
      setIsSignUp(isSignUpDefault);
    }
  }, [isOpen, form, isSignUpDefault]);

  useEffect(() => {
    if (isOpen) setIsSignUp(isSignUpDefault);
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      if (isSignUp) {
        await signup(data);
        setStep("verification");
      } else {
        await login(data);
        onClose();
        toast.success("ورود موفقیت آمز بود!");
      }
    } catch (err) {
      console.log("AUTH ERROR:", err);
      toast.error("خطا! مشکلی رخ داد، لطفا دوباره تلاش کنید");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#1A1A1A]">
            {step === "verification"
              ? "تایید کد"
              : isSignUp
              ? "ثبت‌نام"
              : "ورود"}
          </DialogTitle>
        </DialogHeader>

        {step === "auth" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
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

            {/* FIELDS */}
            <div className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <Label>نام</Label>
                    <Input {...register("first_name")} className="text-right" />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>نام خانوادگی</Label>
                    <Input {...register("last_name")} className="text-right" />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </>
              )}

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

            <Button
              type="submit"
              className="w-full bg-[#E45858] text-white py-6"
            >
              {isSignUp ? "ثبت‌نام" : "ورود"}
            </Button>

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
        ) : (
          /* VERIFICATION STEP */
          <div className="space-y-6 py-4">
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
