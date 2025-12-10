import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import UIRootLayout from "@/components/layout/UIRootLayout.jsx";
import Providers from "./providers";

export const metadata = {
  title: "Finance Market Education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Toaster />

        <Providers>
          <UIRootLayout>{children}</UIRootLayout>
        </Providers>
      </body>
    </html>
  );
}
