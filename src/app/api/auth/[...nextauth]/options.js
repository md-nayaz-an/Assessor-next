import User from "@models/user";
import { connectToDB } from "@utils/database";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    providers: [
        GoogleProvider({
            async profile(profile) {
                try {
                    await connectToDB();
    
                    let user = await User.findOne({
                        email: profile.email
                    });
    
                    if(!user) {
                        user = await User.create({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                            role: "client",
                        })
                        console.log("User created");
                    }

                    return {
                        id: user.id,
                        ...profile,
                        role: user.role,
                    }

                } catch (error) {
                    console.log(error);
                }

            },

            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        },
        )
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.image = user.picture;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.image = token.image
            }
            return session;
        },
    }
}