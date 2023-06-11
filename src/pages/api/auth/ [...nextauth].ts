import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '~/env.mjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);