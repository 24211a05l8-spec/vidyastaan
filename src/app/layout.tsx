import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Vidyastaan — a new possibility for every child",
  description: "Vidyastaan is India's peer-to-peer learning and skill exchange platform connecting underserved school students with college volunteers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      style={{
        "--font-outfit": "'Outfit', system-ui, sans-serif",
        "--font-inter": "'Inter', system-ui, sans-serif",
      } as any}
    >
      <body className="font-sans min-h-full flex flex-col bg-background text-foreground mesh-gradient">
        <AuthProvider>
          {children}
          <Toaster 
            position="top-center"
            toastOptions={{
              className: 'glass border-none shadow-2xl rounded-2xl font-bold',
            }} 
          />
        </AuthProvider>
      </body>
    </html>
  );
}
