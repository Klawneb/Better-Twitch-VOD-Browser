import NextAuth from "next-auth/next";
import TwitchProvider from 'next-auth/providers/twitch';

const clientId: string = process.env.CLIENT_ID ?? '';
const clientSecret: string = process.env.CLIENT_SECRET ?? '';

export default NextAuth({
    providers: [
        TwitchProvider({
            clientId: clientId,
            clientSecret: clientSecret
        })
    ]
})