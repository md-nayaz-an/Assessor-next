"use client";

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import VideoClient from './VideoClient';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import AdminQuestionList from './AdminQuestionList';
import { createQuestionState } from '@recoil/atoms/questionsAtom';
import { deleteLocalQuestionDataSelector } from '@recoil/selectors/deleteLocalQuestionDataSelector';
const AdminAssessmentIndividual = (props) => {

	const router = useRouter();

	const [videoDetails, setVideoDetails] = useState({
		title: "",
		description: "",
		url: "",
		
	});
	const [cloudQuestions, setCloudQuestions] = useState([]);

    const [localQuestions, setLocalQuestions] = useRecoilState(createQuestionState(props.videoId));
	const deleteQuestions = useSetRecoilState(deleteLocalQuestionDataSelector);

	const fetchVideoDetails = async () => {
		const res = await fetch('/api/videos/' + props.videoId);
		const data = await res.json();
		setVideoDetails(data);
		//console.log(data);
	}
	const fetchQuestions = async () => {
		const res = await fetch('/api/questions/' + props.videoId);
		const data = await res.json();
		setCloudQuestions(data);
		//console.log(data);
	}

	useEffect(() => {
		if(props.videoId) {
			fetchVideoDetails();
			fetchQuestions();
		}
	}, [props])

	const [videoProgress, setVideoProgress] = useState({});
	const [play, setPlay] = useState(false);

	const onSubmit = async () => {
		const res = await fetch('/api/questions/new',{
			method: "POST",
			body: JSON.stringify(localQuestions)
		});
		if(res.ok) {
			const data = await res.json();
			console.log(data);
			setCloudQuestions(data);
			deleteQuestions(props.videoId);
		}
		else {
			console.log(res.statusText);
		}
	}
	
	return (
		<section className='py-5 w-full max-w-full flex-center flex-col'>
			<div className='mt-4 w-full max-w-full flex items-end flex-col lg:flex-row overflow-visible'>
				<div className='w-full py-4 lg:w-1/2 flex-center flex-col gap-4'>
					<div className=' flex-start flex-col self-start'>
						<h1 className='head_text text-left'>
							{videoDetails.title}
						</h1>
						<p className='desc text-left'>
							{videoDetails.description}
						</p>
					</div>
					<div className='w-[90vw] aspect-video lg:w-full self-center lg:self-start  relative'>
						<VideoClient
							url={videoDetails.url}
							setVideoProgress={setVideoProgress}
							play={play}
							setPlay={setPlay}
						/>
					</div>
					
				</div>
				
				<div className='lg:p-4 w-full lg:w-1/2 flex-center flex-col gap-2 h-full'>
					<AdminQuestionList
						videoId={props.videoId}
						videoProgress={videoProgress}
						play={play}
						setPlay={setPlay}
						localQuestions={localQuestions}
						cloudQuestions={cloudQuestions}
					/>
				</div>
			</div>
			<button
				className='btn btn-primary w-36'
				onClick={onSubmit}
			>
				Submit
			</button>
		</section>
  	)
}

export default AdminAssessmentIndividual