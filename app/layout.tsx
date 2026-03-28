import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConfirmSunday — Volunteer Confirmation for Churches",
  description: "Automate your Sunday volunteer confirmations. No more chasing people down.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
