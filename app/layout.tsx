import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";

export const metadata: Metadata = {
  title: "Bunch of Chuck Norris Jokes",
  description: "A collection of Chuck Norris jokes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
