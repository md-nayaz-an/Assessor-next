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
import mergeQuestionResponseForStepper from '@utils/mergeQuestionResponseForStepper';
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

	const [prevResponses, setPrevResponses] = useState([]);
	useEffect(() => {
	  console.log(responses);
	
	}, [responses])

	const fetchVideoDetails = async () => {
		const res = await fetch('/api/videos/' + props.videoId, {
            cache: 'no-store'
        });
		const data = await res.json();
		setVideoDetails(data);
		//console.log(data);
	}
	
	const fetchPrevResponses = async () => {
		const res = await fetch('/api/responses/' + props.videoId, {
            cache: 'no-store'
        });
		const data = await res.json();
		setPrevResponses(data);
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
			fetchPrevResponses();
		}
	}, [props])

	const [start, setStart] = useState(false);
  	
	const [name, setName] = useState("");
	const [mail, setMail] = useState("");

	const onStartClick = () => {
		const initialResponseState = {
			videoId: props.videoId,
			name,
			mail,
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
				const data = response.json();
				console.log(data._id);
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
		<section className='w-full max-w-full flex-center flex-col'>
			
			<div className='mt-4 w-full max-w-full flex flex-col lg:flex-row overflow-visible'>
				<div className='w-full py-4 lg:w-1/2 flex flex-col gap-4'>
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
							prevResponses={mergeQuestionResponseForStepper(questions, prevResponses)}
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
						        <div className='pb-48 w-full flex-center flex-col relative lg:pb-20 min-h-[6rem]'>
									{
										(current >= 0 && current < questions.length) &&
										<div className="relative h-full">
											<div className="absolute inset-0 w-20 h-20 flex-center -translate-x-1/2">
												<span className="countdown">
													<span style={{ "--value": Math.floor(questions[current].timestamp - videoProgress.playedSeconds) % 60 }}></span>
												</span>
											</div>
											
											<div className="loading loading-ring absolute inset-0 w-20 h-20 -translate-x-1/2"></div>
										</div>
									}
								</div>
							}
						</div>
					</div>:
					<div className='p-4 flex-center w-full lg:w-1/2'>
						<div className='w-full flex-center flex-col gap-2 self-center'>
							<input
								type="text"
								placeholder="Name"
								className="input input-bordered w-full max-w-xs" 	
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							/>

							<input 
								type="email"
								placeholder="E-mail" 
								className="input input-bordered w-full max-w-xs"
								value={mail}
								required
								onChange={(e) => setMail(e.target.value)}
							/>

							<button className='btn btn-accent' onClick={onStartClick}>Start Assessment</button>
						</div>
					</div>
				}
			</div>
		</section>
  	)
}

export default AssessmentIndividual