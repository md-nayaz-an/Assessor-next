import React from 'react'
import ResponseTable from './ResponseTable'
import AdminResponsesQuestions from './AdminResponsesQuestions'

const AdminDashboard = () => {
  	return (
		<section className='w-full'>
			<ResponseTable />
			<AdminResponsesQuestions />
		</section>
  	)
}

export default AdminDashboard