import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "AITicket - AI Knowledge Base Customer Service System",
  description: "Streamline your customer support with our intelligent ticket management system powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fff' }}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
