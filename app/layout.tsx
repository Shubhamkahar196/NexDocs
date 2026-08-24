import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexDocs | AI-Powered Multi-Tenant Document Analysis Platform",
  description:
    "Enterprise SaaS platform for secure document management, AI-powered document analysis and team collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
        <body className={inter.className}>
          <div className="min-h-screen flex flex-col">
            {/* header */}
            <Header/>
            {/* main */}
            <main className="flex-1">{children}</main>
            {/* Footer */}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
