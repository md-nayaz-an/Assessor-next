"use client";

import AssessmentIndividual from '@components/AssessmentIndividual'
import { useSession } from 'next-auth/react';
import React from 'react'

const Video = ({ params }) => {

    const session = useSession();

    return (
        <AssessmentIndividual 
            videoId={params.videoid}
            userId={session?.data?.user?.id}
        />
    )
}

export default Video;