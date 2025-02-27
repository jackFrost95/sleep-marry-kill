import { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Sleep Marry Kill",
  icons: "icon.webp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="standard-text w-screen h-screen overflow-x-hidden">
        <div>{children}</div>
      </body>
    </html>
  );
}
