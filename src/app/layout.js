"use client";

import Nav from '@components/ClientNav';
import '@styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {
  	return (
		<html lang="en">
			<body>
				<main className='app'>
					<SessionProvider>
						{children}
					</SessionProvider>
				</main>
			</body>
		</html>
  	)
}
