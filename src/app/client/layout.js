"use client";

import ClientNav from '@components/ClientNav';
import '@styles/globals.css';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {


  	return (
		<div className='client'>
                <ClientNav />
                <RecoilRoot>
                    {children}
                </RecoilRoot>
		</div>
	)
}
