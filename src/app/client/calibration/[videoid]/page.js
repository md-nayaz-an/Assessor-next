"use client";

import dynamic from 'next/dynamic';
import React from 'react'

const CalibrationComponent = dynamic(() => import('@webgazer/calibration'), { ssr: false })

const Video = ({ params }) => {
    return (
        <CalibrationComponent
            videoId={params.videoid}
        />
    )
}

export default Video;