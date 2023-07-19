import { User as UserModel } from '@/models/data';
import connectDB from '@/utils/mongodb';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
     providers: [
          CredentialsProvider({
               name: 'Credentials',
               credentials: {
                    username: {
                         label: 'UserName',
                         type: 'text',
                         placeholder: 'john doe',
                    },
                    password: {
                         label: 'Password',
                         type: 'password',
                    },
               },
               async authorize(credentials, req) {
                    console.log(credentials);

                    await connectDB();
                    const user = await UserModel.findOne({
                         userEmail: credentials?.username,
                    }).select('+password');

                    console.log(user);

                    if (!user) return null;

                    if (user.password !== credentials?.password) return null;

                    return {
                         id: user.id,
                         name: user.userName,
                         email: user.userEmail,
                    };
               },
          }),
     ],

     session: {
          strategy: 'jwt',
     },
     callbacks: {
          async jwt({ token, user }) {
               if (user) {
                    token.user = user;
               }

               return token;
          },
          async session({ session, user, token }) {
               session.user = token.user as User;

               return session;
          },
     },
     pages: {
          signIn: '/auth/signIn',
     },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
