"use client";

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Steps from './Steps';
import { useRecoilState } from 'recoil';
import { createResponseState } from '@recoil/atoms/responseAtom';
import QuizComp from './QuizComp';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import dynamic from 'next/dynamic';
const VideoClient = dynamic(() => import("./VideoClient"), { ssr: false });

const AssessmentIndividual = (props) => {

	const router = useRouter();

	const playerRef = useRef(null);
	
	const [videoDetails, setVideoDetails] = useState({
		title: "",
		description: "",
		url: "",
		
	});

	const [questions, setQuestions] = useState([]);

  	const [responses, setResponses] = useRecoilState(createResponseState(props.videoId));

	const fetchVideoDetails = async () => {
		const res = await fetch('/api/videos/' + props.videoId, {
            cache: 'no-store'
        });
		const data = await res.json();
		setVideoDetails(data);
		//console.log(data);
	}
	
	const fetchQuestions = async () => {
		const res = await fetch('/api/questions/' + props.videoId, {
            cache: 'no-store'
        });
		const data = await res.json();
		setQuestions(data);
		//console.log(data);
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

		setCurrent(0);
	  	setResponses(initialResponseState);
	  	setStart(true);
		setPlay(true);
	}

	useEffect(() => {
	  console.log(responses);
	}, [responses])

	const [current, setCurrent] = useState(-1);

	const [videoProgress, setVideoProgress] = useState({});
	const [play, setPlay] = useState(false);
	const [show, setShow] = useState(false);


	const onNext = () => {
		setCurrent(prevCurrent => prevCurrent + 1);
		setPlay(true);
		setShow(false);
	}

	const onSubmit = async () => {
		console.log("submited");
		
		try {
			const response = await fetch("/api/responses/new", {
				method: "POST",
				body: JSON.stringify(responses),
			});

			if(response.ok) {
				router.push("/client/assessments");
			}
		} catch (error) {
			console.error(error);
		}
	}
	
	useEffect(() => {
		if(videoProgress.playedSeconds >= questions[current]?.timestamp) {
//			console.log({timestamp: questions[current]?.timestamp, played : videoProgress.playedSeconds});
			setPlay(false);
			setShow(true);
		}

	}, [videoProgress])
	
	return (
		<section className='py-5 w-full max-w-full flex-center flex-col'>
			<div className=' flex-start flex-col self-start'>
				<h1 className='head_text text-left'>
					{videoDetails.title}
				</h1>
				<p className='desc text-left'>
					{videoDetails.description}
				</p>
			</div>
			<div className='mt-4 w-full max-w-full flex items-end flex-col lg:flex-row overflow-visible'>
				<div className='w-full py-4 lg:w-1/2 flex-center flex-col gap-4'>
					<div className='w-[90vw] aspect-video lg:w-full self-center lg:self-start  relative'>
						<VideoClient
							playerRef={playerRef}
							url={videoDetails.url}
							setVideoProgress={setVideoProgress}
							play={play}
							setPlay={setPlay}
						/>

						<div 
							className={`absolute bottom-0 p-4 w-full h-2/4 bg-neutral-focus opacity-96 rounded-t-xl overflow-auto text-lg text-accent-focus
								${(show) ? '': 'invisible'} 
								hover:h-3/4 
								transition-all ease-in-out delay-150
							`}
						>
							<span className='opacity-100'>
								{questions[current]?.summary}
							</span>
						</div>
					</div>
					
					{
						(start) ?
							<button className='btn btn-primary self-end' onClick={onSubmit}>End and Submit</button> :
							<></>
					}
				</div>
				
				{
					start ?
					<div className='lg:p-4 w-full lg:w-1/2 flex-center flex-col gap-2'>
						<Steps 
							responses={responses}
							current={current}
						/>

						<div className='w-full rounded-lg'>
							{
								(show) ?
								<QuizComp
									videoId={props.videoId}
									question={questions[current]}
									onNext={onNext}
									show={show}
								/> :
								<></>
							}
						</div>
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