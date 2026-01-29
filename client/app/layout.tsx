import type { Metadata } from "next";
import { ExerciseProvider } from "../context/ExerciseContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kodhörnan",
  description: "En plats för att lära sig kod.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <ExerciseProvider>
          {children}
        </ExerciseProvider>
      </body>
    </html>
  );
}
