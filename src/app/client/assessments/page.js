import { options } from '@app/api/auth/[...nextauth]/options';
import Assessments from '@components/Assessments'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const ListAssessments = async () => {

    const session = await getServerSession(options);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/client/assessments");
    }

    return (
        <Assessments />
    )
}

export default ListAssessments