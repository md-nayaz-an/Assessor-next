import Calibration from '@webgazer/calibration';
import React from 'react'

const Video = ({ params }) => {
    return (
        <Calibration
            videoId={params.videoid}
        />
    )
}

export default Video;