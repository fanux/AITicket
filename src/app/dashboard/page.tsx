"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b py-4">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AI
            </div>
            <h1 className="text-xl font-bold tracking-tight">AITicket</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Welcome, {session?.user?.name || session?.user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">Open Tickets</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">Resolved Today</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">Average Response Time</h3>
            <p className="text-3xl font-bold">2.5h</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recent Tickets</h3>
          <div className="bg-card rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Subject</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "T-1001", subject: "Login issue with mobile app", status: "Open", created: "2h ago" },
                  { id: "T-1000", subject: "Cannot update profile picture", status: "In Progress", created: "3h ago" },
                  { id: "T-999", subject: "Payment failed", status: "Open", created: "5h ago" },
                  { id: "T-998", subject: "How to export data?", status: "Resolved", created: "1d ago" },
                  { id: "T-997", subject: "Feature request: Dark mode", status: "Closed", created: "2d ago" },
                ].map((ticket, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">{ticket.id}</td>
                    <td className="p-4">{ticket.subject}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status === "Open" ? "bg-blue-100 text-blue-800" :
                        ticket.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        ticket.status === "Resolved" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">{ticket.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
