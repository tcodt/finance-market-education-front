"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, ArrowRight } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function AuthModal({ isOpen, onClose, isSignUpDefault }) {
  const [authMethod, setAuthMethod] = useState("email"); // 'email' or 'phone'
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [step, setStep] = useState("auth"); // 'auth' or 'verification'
  const [verificationCode, setVerificationCode] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsSignUp(isSignUpDefault);
    }
  }, [isOpen, isSignUpDefault]);

  const handleSubmit = () => {
    if (isSignUp) {
      setStep("verification");
    } else {
      // Handle sign in
      onClose();
    }
  };

  const handleVerify = () => {
    // Handle verification
    onClose();
    setStep("auth");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setIsSignUp(false);
          setStep("auth");
        }
        onClose();
      }}
    >
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
          <div className="space-y-6 py-4">
            {/* Auth Method Tabs */}
            <div className="flex gap-2 p-1 bg-[#F5EDE3] rounded-xl">
              <button
                onClick={() => setAuthMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all ${
                  authMethod === "email"
                    ? "bg-white text-[#E45858] shadow-sm font-medium"
                    : "text-[#8B8B8B]"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>ایمیل</span>
              </button>
              <button
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all ${
                  authMethod === "phone"
                    ? "bg-white text-[#E45858] shadow-sm font-medium"
                    : "text-[#8B8B8B]"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>شماره موبایل</span>
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#1A1A1A]">
                    نام و نام خانوادگی
                  </Label>
                  <Input
                    id="name"
                    placeholder="نام خود را وارد کنید"
                    className="text-right border-[#E8E0D5] focus:border-[#E45858]"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-[#1A1A1A]">
                  {authMethod === "email" ? "ایمیل" : "شماره موبایل"}
                </Label>
                <Input
                  id="contact"
                  type={authMethod === "email" ? "email" : "tel"}
                  placeholder={
                    authMethod === "email" ? "example@email.com" : "۰۹۱۲۳۴۵۶۷۸۹"
                  }
                  className="text-right border-[#E8E0D5] focus:border-[#E45858]"
                  dir={authMethod === "phone" ? "rtl" : "ltr"}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1A1A1A]">
                  رمز عبور
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  className="text-right border-[#E8E0D5] focus:border-[#E45858]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl py-6"
            >
              {isSignUp ? "ثبت‌نام" : "ورود"}
            </Button>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center text-sm">
              {isSignUp ? (
                <p className="text-[#8B8B8B]">
                  قبلاً ثبت‌نام کرده‌اید؟{" "}
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="text-[#E45858] font-medium hover:underline"
                  >
                    وارد شوید
                  </button>
                </p>
              ) : (
                <p className="text-[#8B8B8B]">
                  حساب کاربری ندارید؟{" "}
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="text-[#E45858] font-medium hover:underline"
                  >
                    ثبت‌نام کنید
                  </button>
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Back Button */}
            <button
              onClick={() => setStep("auth")}
              className="flex items-center gap-2 text-[#8B8B8B] hover:text-[#E45858] transition-colors"
            >
              <span>بازگشت</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Verification Description */}
            <div className="text-center space-y-2">
              <p className="text-[#1A1A1A]">
                کد تایید به {authMethod === "email" ? "ایمیل" : "شماره"} شما
                ارسال شد
              </p>
              <p className="text-sm text-[#8B8B8B]" dir="ltr">
                {contactInfo}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-12 text-lg border-[#E8E0D5] focus:border-[#E45858]"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-12 text-lg border-[#E8E0D5] focus:border-[#E45858]"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-12 text-lg border-[#E8E0D5] focus:border-[#E45858]"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-12 text-lg border-[#E8E0D5] focus:border-[#E45858]"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-12 text-lg border-[#E8E0D5] focus:border-[#E45858]"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-12 text-lg border-[#E8E0D5] focus:border-[#E45858]"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={verificationCode.length !== 6}
              className="w-full bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl py-6 disabled:opacity-50"
            >
              تایید کد
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              <button className="text-sm text-[#8B8B8B] hover:text-[#E45858] transition-colors">
                ارسال مجدد کد
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
