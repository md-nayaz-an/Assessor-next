"use client";

import ClientNav from '@components/ClientNav';
import '@styles/globals.css';
import webgazer from '@webgazer/scripts/index.mjs';
import webgazerContext from '@webgazer/webgazerContext';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {
    const [webgazerState, setWebgazerState] = useState(null);
  
    useEffect(() => {
        setWebgazerState(webgazer);
    }, []);
  	
    return (
		<div className='client'>
                <ClientNav />
                <RecoilRoot>
                    <webgazerContext.Provider value={webgazerState}>
                        {children}
                    </webgazerContext.Provider>
                </RecoilRoot>
		</div>
	)
}
