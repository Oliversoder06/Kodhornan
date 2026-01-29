import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
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
        <AuthProvider>
          <ExerciseProvider>{children}</ExerciseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
