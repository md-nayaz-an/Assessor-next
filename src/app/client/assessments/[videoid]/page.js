"use client";

import AssessmentIndividual from '@components/AssessmentIndividual'
import webgazerContext from '@webgazer/webgazerContext'
import React, { useContext, useEffect } from 'react'

const Video = ({ params }) => {

    const webgazer = useContext(webgazerContext);

    useEffect(() => {
        return () => {
            if(webgazer !== null)
                webgazer.end();
        }
    }, [])
    
    return (
        <AssessmentIndividual 
            videoId={params.videoid}
        />
    )
}

export default Video;