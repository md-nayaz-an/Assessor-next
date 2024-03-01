import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

const DownloadModal = (props) => {
	const [selectedPages, setSelectedPages] = useState([]);
	const [data, setData] = useState([]);

	const handleCheckboxChange = (index) => {
		const updatedSelectedPages = [...selectedPages];
		const pageIndex = updatedSelectedPages.indexOf(index);

		if (pageIndex === -1) {
		updatedSelectedPages.push(index);
		} else {
		updatedSelectedPages.splice(pageIndex, 1);
		}

		setSelectedPages(updatedSelectedPages.sort());
	};


	const handleCancel = () => {

		document.getElementById('my_modal_3').close();
	};

	const [loading, setLoading] = useState(false);
	const [ready, setReady] = useState(false);

	const handleDownload = async () => {
		setLoading(true);

		let header = ["sl", "Name", "Mail", "Attempted", "Phone", "Age", "Gender", "Points"]

		props.questions.map((question) => {
			header.push("")
			header.push("(Q) " + question.question);

			question.options.map((option) => {
				header.push((option.isCorrect ? "(True) " : "") + option.option)
			})

			header.push(question.sliderquestion, "Thoughts", "Bet");
		})

		setData((prevData) => [...prevData, header]);

		const promises = selectedPages.map(async (page) => {
			const res = await fetch(`/api/analytics/responses/${props.videoId}?page=${page}&perPage=${25}`, {
				//cache: 'no-store'
			});	

			if(!res.ok)
				return

			const responses = await res.json();
			let rowData = [];

			responses.responses?.map((response, index) => {
				let temp = [];

				temp.push(
					(responses.page - 1) * responses.perPage + index + 1,
					response.name || response.userid?.name,
					response.mail || response.userid?.email,
					new Date(response.timestamp).toLocaleString(),
					`'${response.userid?.phone}'` || "?",
					response.userid?.age || "?",
					response.userid?.gender || "?",
					response.userid?.points,
				)

				props.questions.map((question, qIndex) => {
					temp.push("", "");

					question.options.map((option, resIndex) => {
						let str = "";

						if(response?.response[qIndex]?.options[0] == resIndex)
							str += "(1st)"

						if(response?.response[qIndex]?.options[2] == resIndex)
							str += "(2nd)"

						temp.push(str);
					})

					temp.push(
						response?.response[qIndex]?.probability,
						response?.response[qIndex]?.thoughts,
						(response?.response[qIndex]?.options[1] !== undefined && 
							response?.response[qIndex]?.options[1] === 0) ? "Yes" : "No"
					)
				})

				rowData.push(temp)
			})

			return rowData;
		})

		const allRowData = await Promise.all(promises);

		// Flatten the array of arrays into a single array
		const flattenedData = allRowData.flat();

		// Update state
		setData((prevData) => [...prevData, ...flattenedData]);

		setLoading(false);
		setReady(true);
	}

	useEffect(() => {
		setSelectedPages(Array.from({length: props.totalPages}, (_, i) => i+1))
	}, [props.totalPages]);

	return (
		<>
		<button
			className='btn btn-primary mr-4 self-end'
			onClick={() => document.getElementById('my_modal_3').showModal()}
		>
			Download CSV
		</button>
		<dialog id='my_modal_3' className='modal'>
			<div className='modal-box flex flex-col '>
			<h3 className='font-bold text-lg text-center'>Select the Pages to Download as CSV</h3>
			{Array.from({ length: props.totalPages }).map((_, index) => (
				<div key={index} className='flex justify-center gap-8 p-2'>
				<span className=''>Page {index + 1}</span>
				<input
					type='checkbox'
					checked={selectedPages.includes(index + 1)}
					onChange={() => handleCheckboxChange(index + 1)}
					className='checkbox'
				/>
				</div>
			))}
			<div className='modal-action flex-start flex-col'>
				<div className='my-2 px-4 w-full flex-center gap-4'>
				<button className='btn w-1/2' onClick={handleCancel}>
					Cancel
				</button>
				{
					ready ?
					<CSVLink
						data={data}
						filename={`${props.videoDetails?.title}_${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}`}
						className='btn btn-primary w-1/2'
						onClick={() => {
							setData([]);
							setReady(false);
							document.getElementById('my_modal_3').close();
						}}
					>
						Save
					</CSVLink> :
					<button className='btn w-1/2' onClick={handleDownload} type='submit' disabled={loading}>
						{
							loading && <span className="loading loading-spinner"></span>
						}
						Download
					</button>
				}
				</div>
			</div>
			</div>
		</dialog>
		</>
	);
};

export default DownloadModal;
