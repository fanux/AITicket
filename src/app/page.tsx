"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const result = await signIn("credentials", {
        email,
        redirect: false,
      });
      
      if (result?.error) {
        setError("Invalid email");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    
    try {
      await signIn("github", { 
        callbackUrl: "https://badptaflzpux.usw.sealos.io/callback",
        redirect: true
      });
    } catch (error) {
      setError("An error occurred with GitHub login. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '400px',
      margin: '100px auto',
      padding: '0 20px'
    }}>
      <h1 style={{ 
        fontSize: '48px', 
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Create an account
      </h1>
      
      <p style={{ 
        fontSize: '20px', 
        marginBottom: '30px',
        color: '#333'
      }}>
        Enter your email below to create your account
      </p>
      
      {error && (
        <div style={{
          backgroundColor: '#FFEBEE',
          color: '#D32F2F',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '15px'
          }}
        />
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '30px'
          }}
        >
          {isLoading ? "Signing in..." : "Sign In with Email"}
        </button>
      </form>
      
      <div style={{ 
        position: 'relative', 
        textAlign: 'center',
        margin: '30px 0',
        borderTop: '1px solid #e5e5e5',
        height: '0'
      }}>
        <span style={{ 
          position: 'relative',
          top: '-10px',
          backgroundColor: '#fff',
          padding: '0 10px',
          color: '#666',
          fontSize: '14px'
        }}>
          OR CONTINUE WITH
        </span>
      </div>
      
      <button 
        onClick={handleGitHubLogin}
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            fill="currentColor"
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        GitHub
      </button>
      
      <p style={{ 
        fontSize: '14px', 
        textAlign: 'center', 
        marginTop: '30px',
        color: '#666'
      }}>
        By clicking continue, you agree to our{" "}
        <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
