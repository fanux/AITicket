"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function CallbackPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    // Handle the callback from GitHub OAuth
    const handleCallback = async () => {
      // Get the code and state from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && state) {
        try {
          // Process the OAuth callback
          await signIn("github", { 
            callbackUrl: "/dashboard",
            redirect: false
          });
        } catch (error) {
          console.error("Error during GitHub OAuth callback:", error);
        }
      }
    };

    if (status === "authenticated") {
      router.push("/dashboard");
    } else if (status === "unauthenticated") {
      handleCallback();
    }
  }, [status, router]);

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      alignItems: "center", 
      justifyContent: "center"
    }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          marginBottom: "16px" 
        }}>
          Processing authentication...
        </h2>
        <p style={{ color: "#666" }}>
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
}
