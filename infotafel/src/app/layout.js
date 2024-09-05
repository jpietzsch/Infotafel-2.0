import localFont from "next/font/local";
import "./globals.css";

import Clock from "./components/currentime";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Infotafel",
  description: "Alles relevanten Informationen auf einen Blick",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <link rel="icon" href="SFZLogoTiny.png" /> 
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#070707] text-[#e5e5e5]`}
      >
        <div className="max-w-screen max-h-screen">

          <div className="w-full h-20 bg-yellow-500 flex p-5 text-black font-semibold">
            <img src="SFZLogo.svg" />
            <div className="flex-grow"></div>
            <Clock className="text-3xl">time place holder</Clock>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
