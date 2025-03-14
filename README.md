# AITicket - AI-Powered Knowledge Base Customer Service

AITicket is a customer service ticket management system powered by AI. This project includes a landing page, authentication system, and dashboard.

## Authentication System

The authentication system supports two login methods:

1. **GitHub OAuth Login**: Users can sign in with their GitHub accounts.
2. **Email/Password Login**: Users can sign in with their email and password.

### Features

- Secure authentication using NextAuth.js
- Protected routes with middleware
- Responsive login page
- Error handling for authentication failures
- Session management

### Setup

1. Create a GitHub OAuth application at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set the following environment variables in `.env.local`:

```
# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Authentication Flow

1. Users can access the login page from the homepage
2. They can choose to sign in with GitHub or email/password
3. After successful authentication, they are redirected to the dashboard
4. Protected routes (like the dashboard) require authentication
5. Users can sign out from the dashboard

## Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- NextAuth.js for authentication

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
