import React from 'react'
import { useState } from 'react';

const NewAssessment = ({ setVideos }) => {

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');

	const onReset = () => {
		setTitle('');
		setDescription('');
		setUrl('');
	}

	const onSave = async () => {

		const videoDetails = {
			title,
			description,
			url,
		}

		try {
			const newVideo = await fetch("/api/videos/new", {
				method: "POST",
				body: JSON.stringify(videoDetails),
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setVideos(prevVideos => ([
					...prevVideos,
					data
				]));
			});
			onReset();

		} catch (error) {
			console.error(error);
		}
		
		let modal = document.getElementById('my_modal_1');
		console.log(modal);
		modal.close();
	}
	
	return (
		<>	
			<button 
				className='btn btn-primary mr-4 self-end'
				onClick={()=>document.getElementById('my_modal_1').showModal()}
			>
				Add New Assessment
			</button>

			<dialog id="my_modal_1" className="modal">	
				<div className="modal-box flex flex-col">
					<h3 className="font-bold text-lg">Add New Assessment</h3>
					<button 
						className='btn btn-accent btn-xs w-1/4 self-end'
						onClick={onReset}
					>
						Reset
					</button>
					<div className="modal-action flex-start flex-col">
						
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Title</span>
							</label>
							<input 
								type="text" 
								placeholder="Enter Title" 
								className="input input-bordered w-full max-w-xs" 
								onChange={(e) => setTitle(e.target.value)}
								value={title}
							/>
							
							<label className="label mt-4">
								<span className="label-text">URL</span>
							</label>
							<input 
								type="text" 
								placeholder="Paste URL" 
								className="input input-bordered w-full max-w-xs" 
								onChange={(e) => setUrl(e.target.value)}
								value={url}
							/>
							
							<label className="label mt-4">
								<span className="label-text">Description</span>
							</label>
							<textarea 
								type="text" 
								placeholder="Enter Description" 
								className="textarea textarea-bordered h-24 w-full max-w-xs" 
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>

							
						</div>

						<div className='my-8 px-4 w-full flex-center gap-4'>
							<form method="dialog" className=' w-1/2'>
								<button className="btn w-full">Discard</button>
							</form>
							<button 
								className="btn btn-primary w-1/2" 
								type='submit'
								onClick={onSave}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>	
	)
}

export default NewAssessment