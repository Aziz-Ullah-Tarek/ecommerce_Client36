import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://shophub-one-rosy.vercel.app/api';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${API_URL}/users/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user && user.token) {
            return {
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role,
              token: user.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.accessToken = user.token;
      }
      
      // Handle Google OAuth
      if (account?.provider === "google") {
        token.role = token.role || 'user';
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role || 'user';
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Allow Google OAuth sign in
      if (account?.provider === "google") {
        return true;
      }
      
      // Allow credentials sign in
      if (account?.provider === "credentials") {
        return true;
      }
      
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
