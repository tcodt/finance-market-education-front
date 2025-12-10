import { User, Bell, Lock, Palette, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          تنظیمات
        </h1>
        <p className="text-[#8B8B8B]">تنظیمات حساب کاربری خود را مدیریت کنید</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white border border-[#E8E0D5] p-1 rounded-xl mb-6">
          <TabsTrigger
            value="profile"
            className="rounded-lg data-[state=active]:bg-[#E45858] data-[state=active]:text-white"
          >
            <User className="w-4 h-4 ml-2" />
            پروفایل
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg data-[state=active]:bg-[#E45858] data-[state=active]:text-white"
          >
            <Bell className="w-4 h-4 ml-2" />
            اعلان‌ها
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-lg data-[state=active]:bg-[#E45858] data-[state=active]:text-white"
          >
            <Lock className="w-4 h-4 ml-2" />
            امنیت
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h3 className="font-bold text-[#1A1A1A] mb-6">اطلاعات پروفایل</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#1A1A1A] mb-2 block">نام</Label>
                  <Input
                    placeholder="نام خود را وارد کنید"
                    className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                    dir="rtl"
                  />
                </div>
                <div>
                  <Label className="text-[#1A1A1A] mb-2 block">
                    نام خانوادگی
                  </Label>
                  <Input
                    placeholder="نام خانوادگی خود را وارد کنید"
                    className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                    dir="rtl"
                  />
                </div>
              </div>
              <div>
                <Label className="text-[#1A1A1A] mb-2 block">ایمیل</Label>
                <Input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A] mb-2 block">شماره تماس</Label>
                <Input
                  placeholder="شماره تماس خود را وارد کنید"
                  className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                  dir="ltr"
                />
              </div>
              <Button className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 mt-4">
                ذخیره تغییرات
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h3 className="font-bold text-[#1A1A1A] mb-6">تنظیمات اعلان‌ها</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F5EDE3] rounded-xl">
                <div>
                  <p className="font-medium text-[#1A1A1A]">اعلان‌های ایمیلی</p>
                  <p className="text-sm text-[#8B8B8B]">
                    دریافت اعلان‌ها از طریق ایمیل
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F5EDE3] rounded-xl">
                <div>
                  <p className="font-medium text-[#1A1A1A]">
                    اعلان دوره‌های جدید
                  </p>
                  <p className="text-sm text-[#8B8B8B]">
                    مطلع شدن از دوره‌های آموزشی جدید
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-[#F5EDE3] rounded-xl">
                <div>
                  <p className="font-medium text-[#1A1A1A]">یادآوری کلاس‌ها</p>
                  <p className="text-sm text-[#8B8B8B]">
                    یادآوری قبل از شروع کلاس‌ها
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6 bg-white border-0 shadow-sm">
            <h3 className="font-bold text-[#1A1A1A] mb-6">تغییر رمز عبور</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-[#1A1A1A] mb-2 block">
                  رمز عبور فعلی
                </Label>
                <Input
                  type="password"
                  placeholder="رمز عبور فعلی را وارد کنید"
                  className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A] mb-2 block">
                  رمز عبور جدید
                </Label>
                <Input
                  type="password"
                  placeholder="رمز عبور جدید را وارد کنید"
                  className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                  dir="ltr"
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A] mb-2 block">
                  تکرار رمز عبور جدید
                </Label>
                <Input
                  type="password"
                  placeholder="رمز عبور جدید را تکرار کنید"
                  className="border-[#E8E0D5] rounded-xl focus:border-[#E45858] focus:ring-[#E45858]/20"
                  dir="ltr"
                />
              </div>
              <Button className="bg-[#E45858] hover:bg-[#d14545] text-white rounded-xl px-6 mt-4">
                تغییر رمز عبور
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
