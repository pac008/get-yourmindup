import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "@/db";


const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    // }),
    // Twitter({
    //   clientId: process.env.TWITTER_CLIENT_ID ?? "",
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET ?? "",
    // }),
    Credentials({
      name: "Custom Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@google.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        const resp = (await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        )) as any;
        return resp
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  jwt: {},
  session: {
    maxAge: 2592000, // 1 month
    strategy: "jwt",
    updateAge: 86400, // 1 day
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials });
      return true
    },
    async redirect(params) {
      console.log({ params });
      return params.baseUrl;

    },
    async jwt({ token, account, user }: any) {
      console.log({token});
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "credentials":
            token.user = user;
            break;

          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(user.email, user.name);
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }: any) {
      console.log(session);
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

});
export { handler as GET, handler as POST };
