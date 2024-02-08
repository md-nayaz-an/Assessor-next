import { options } from '@app/api/auth/[...nextauth]/options'
import AssessmentIndividual from '@components/AssessmentIndividual'
import ClientResult from '@components/ClientResult'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Response = async ({ params }) => {

    return (
        <ClientResult 
            responseId={params.responseid}
            videoId={params.videoid}
        />
    )
}

export default Response