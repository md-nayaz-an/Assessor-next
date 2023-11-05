'use client';

import { responsesAtom } from '@recoil/atoms/responsesAtom';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { useRecoilValue } from 'recoil';

const ResponsePage = ({ params }) => {

    console.log(params);
    
    const responses = useRecoilValue(responsesAtom);
    console.log(responses);
    
    return (
        <div>ResponsePage</div>
    )
}

export default ResponsePage