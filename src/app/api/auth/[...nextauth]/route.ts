import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          redirect_uri: "https://badptaflzpux.usw.sealos.io/callback",
        },
      },
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        // This is where you would normally validate the email
        // For demo purposes, we'll just accept any valid email format
        if (credentials?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
          return {
            id: "1",
            name: credentials.email.split('@')[0],
            email: credentials.email,
          };
        }
        
        // If you return null, an error will be displayed advising the user to check their details
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      // Redirect to the callback URL specified in the GitHub OAuth app
      else if (url.startsWith("https://badptaflzpux.usw.sealos.io/callback")) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
