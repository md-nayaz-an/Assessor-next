import AssessmentIndividual from '@components/AssessmentIndividual'
import ClientResult from '@components/ClientResult'
import React from 'react'

const Response = ({ params }) => {
    return (
        <ClientResult 
            responseId={params.responseid}
            videoId={params.videoid}
        />
    )
}

export default Response