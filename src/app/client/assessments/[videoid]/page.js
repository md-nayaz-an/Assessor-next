"use client";

import AssessmentIndividual from '@components/AssessmentIndividual'
import { createResponseState } from '@recoil/atoms/responseAtom';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useRecoilState } from 'recoil';

const Video = ({ params }) => {

    const session = useSession();

    
  	const [responses, setResponses] = useRecoilState(createResponseState(params.videoid, session?.data?.user?.id));

    return (
        <AssessmentIndividual 
            videoId={params.videoid}
            userId={session?.data?.user?.id}
            responses={responses}
            setResponses={setResponses}
        />
    )
}

export default Video;