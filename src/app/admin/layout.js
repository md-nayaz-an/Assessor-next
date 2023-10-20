"use client";

import AdminNav from '@components/AdminNav';
import '@styles/globals.css';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {
  	return (
		<div className='client'>
                <AdminNav />
                <RecoilRoot>
                    {children}
                </RecoilRoot>
		</div>
	)
}
