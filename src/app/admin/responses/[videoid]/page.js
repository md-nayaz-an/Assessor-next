import AssessmentResult from '@components/AssessmentResult'
import React from 'react'

const Response = async ({ params }) => {

    return <AssessmentResult
                videoId={params.videoid}
            />
}

export default Response