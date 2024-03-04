import React from 'react'
import ResponseTable from './ResponseTable'
import AdminResponsesAssessments from './AdminResponsesAssessments'

const AdminDashboard = () => {
  	return (
		<section className='w-full'>
			<ResponseTable />
			<AdminResponsesAssessments />
		</section>
  	)
}

export default AdminDashboard