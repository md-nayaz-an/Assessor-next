"use client";

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import VideoClient from './VideoClient';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import AdminQuestionList from './AdminQuestionList';
import { createQuestionState } from '@recoil/atoms/questionsAtom';
const AdminAssessmentIndividual = (props) => {

	const router = useRouter();

	const [videoDetails, setVideoDetails] = useState({
		title: "",
		description: "",
		url: "",
		
	});

	const [localQuestions, setLocalQuestions] = useRecoilState(createQuestionState(props.videoId));
	
	const fetchVideoDetails = async () => {
		const res = await fetch('/api/videos/' + props.videoId);
		const data = await res.json();
		setVideoDetails(data);
		//console.log(data);
	}
	
	
	useEffect(() => {
		if(props.videoId) {
			fetchVideoDetails();
		}
	}, [props])

	const [videoProgress, setVideoProgress] = useState({});
	const [play, setPlay] = useState(false);

	
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
					/>
					
				</div>
			</div>
		</section>
  	)
}

export default AdminAssessmentIndividual