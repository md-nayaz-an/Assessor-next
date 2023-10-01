import AssessmentIndividual from '@components/AssessmentIndividual'
import React from 'react'

const Video = ({ params }) => {
    return (
        <AssessmentIndividual 
            videoId={params.videoid}
        />
    )
}

export default Video;