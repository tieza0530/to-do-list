import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "To Do List",
  description: "Quản lý công việc cá nhân",
};

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body >
        <div className="bg-neutral-100">
          <div className="flex flex-col justify-around h-screen">
            <Header />
              {children} 
          </div>
        </div>
      </body>
    </html>
  );
}
