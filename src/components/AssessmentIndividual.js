"use client";

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import VideoClient from './VideoClient';
import Steps from './Steps';
import { useRecoilState } from 'recoil';
import { createResponseState } from '@recoil/atoms/responseAtom';

const AssessmentIndividual = (props) => {

	const [videoDetails, setVideoDetails] = useState({
		title: "",
		description: "",
		url: "",
		
	});

	const [questions, setQuestions] = useState([]);

  	const [responses, setResponses] = useRecoilState(createResponseState(props.videoId));

	const fetchVideoDetails = async () => {
		const res = await fetch('/api/videos/' + props.videoId);
		const data = await res.json();
		setVideoDetails(data);
		console.log(data);
	}
	
	const fetchQuestions = async () => {
		const res = await fetch('/api/questions/' + props.videoId);
		const data = await res.json();
		setQuestions(data);
		console.log(data);
	}
	
	useEffect(() => {
		if(props.videoId) {
			fetchVideoDetails();
			fetchQuestions();
		
		}
	}, [props])

	const [start, setStart] = useState(false);
  	
	const onStartClick = () => { 
		const initialResponseState = {
			videoId: props.videoId,
			response: questions.map(question => ({
				questionid: question._id, 
				options: [],
				status: 0,
			})),
			timestamp: Date.now(),
		};

	  	setResponses(initialResponseState);
	  	setStart(true);
	}

	useEffect(() => {
	  console.log(responses);
	
	}, [responses])


	const [videoProgress, setVideoProgress] = useState({});

	useEffect(() => {
	  console.log(videoProgress);
	
	}, [videoProgress])
	
	return (
		<section className='p-5 w-full max-w-full flex-center flex-col'>
			<div className=' flex-start flex-col self-start'>
				<h1 className='head_text text-left'>
					{videoDetails.title}
				</h1>
				<p className='desc text-left'>
					{videoDetails.description}
				</p>
			</div>
			<div className='mt-4 w-full max-w-full flex-start flex-col lg:flex-row overflow-visible'>
				<div className='w-[90vw] aspect-video lg:w-1/2 self-center lg:self-start'>
					<VideoClient
						url={videoDetails.url}
						setVideoProgress={setVideoProgress}
					/>
				</div>
				
				{
					start ?
					<div className='p-4 w-full lg:w-1/2 h-96'>
						<Steps 
							responses={responses}
						/>
					</div>:
					<div className='p-4 w-full flex-center lg:w-1/2 self-center'>
						<button className='btn btn-accent' onClick={onStartClick}>Start Assessment</button>
					</div>
					}
			</div>
		</section>
  	)
}

export default AssessmentIndividual