import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/user";
import dbConnect from "@/lib/DB";
import bcrypt from "bcryptjs";

class CustomAuthError extends AuthError {
  constructor(message) {
    super();
    this.message = message;
    this.name = "CustomAuthError";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await dbConnect();

        const { email, password } = credentials;
        if (!email || !password) {
          throw new CustomAuthError("Email and password are required");
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new CustomAuthError("Invalid email or password");
        if (!user.isVerified) throw new CustomAuthError("Email not verified");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new CustomAuthError("Invalid email or password");
        }

        return {
          _id: user._id.toString(),
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          avatar: user.avatar,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On sign in
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.isVerified = user.isVerified;
        token.avatar = user.avatar;
      }

      // ✅ On client session.update()
      if (trigger === "update" && session) {
        if (session.username) token.username = session.username;
        if (session.avatar) token.avatar = session.avatar;
        if (session.email) token.email = session.email;
        if (session.isAdmin !== undefined) token.isAdmin = session.isAdmin;
        if (session.isVerified !== undefined)
          token.isVerified = session.isVerified;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.isAdmin = token.isAdmin;
      session.user.isVerified = token.isVerified;
      session.user.avatar = token.avatar;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});
