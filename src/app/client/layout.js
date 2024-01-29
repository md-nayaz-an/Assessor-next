"use client";

import ClientNav from '@components/ClientNav';
import '@styles/globals.css';
import { redirect } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import { useSession } from "next-auth/react";

export default function RootLayout({ children }) {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/client");
        }
    })

  	return (
		<div className='client'>
                <ClientNav />
                <RecoilRoot>
                    {children}
                </RecoilRoot>
		</div>
	)
}
