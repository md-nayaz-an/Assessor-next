import AdminAssessmentIndividual from '@components/AdminAssessmentIndividual';
import React from 'react'

const Video = ({ params }) => {
    return (
        <AdminAssessmentIndividual
            videoId={params.videoid}
        />
    )
}

export default Video;