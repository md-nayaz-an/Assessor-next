"use client";

import Nav from '@components/ClientNav';
import '@styles/globals.css';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {
  	return (
		<html lang="en">
			<body>
				<main className='app'>
					{children}
				</main>
			</body>
		</html>
  	)
}
