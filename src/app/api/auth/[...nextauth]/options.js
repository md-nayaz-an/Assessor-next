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

                    console.log(user);

                    return {
                        id: user.id,
                        ...user,
                        role: user.role,
                    }

                } catch (error) {
                    console.log(error);
                }

            },

            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session) {
                return { ...token, userData: session?.userData };
            }

            if (user) {
                //console.log("user in jwt", user);
                token.id = user.id;
                token.userData = user._doc;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                //console.log("token in session", token.userData);
                session.user.id = token.id;
                session.userData = token.userData;
            }
            return session;
        },
    }
}