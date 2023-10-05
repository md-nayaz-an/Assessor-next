"use client";

import Nav from '@components/Nav';
import '@styles/globals.css';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {
  	return (
		<html lang="en">
			<body>
				<main className='app'>
					<Nav />
					<RecoilRoot>
						{children}
					</RecoilRoot>
				</main>
			</body>
		</html>
  	)
}
