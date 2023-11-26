"use client";

import mergeQuestionResponseForStepper from '@utils/mergeQuestionResponseForStepper';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { VictoryPie } from 'victory';

const ClientResult = (props) => {

	const [questions, setQuestions] = useState([]);
	const [responses, setResponses] = useState([]);
	const [videoDetails, setVideoDetails] = useState({
		title: "",
		description: "",
		url: "",
	});
	
	const fetchVideoDetails = async () => {
		const res = await fetch('/api/videos/' + props.videoId, {
            cache: 'no-store'
        });
		const data = await res.json();
		setVideoDetails(data);
		//console.log(data);
	}
	
	const fetchResponses = async () => {
		const res = await fetch('/api/responses/' + props.videoId, {
			cache: 'no-store'
		});
		const data = await res.json();
		setResponses(data);
		//console.log(data);
	}
	
	const fetchQuestions = async () => {
		const res = await fetch('/api/questions/' + props.videoId, {
			cache: 'no-store'
		});
		const data = await res.json();
		setQuestions(data);
		console.log(data);
	}
	
	useEffect(() => {
		if(props.videoId) {
			fetchVideoDetails();
			fetchQuestions();
			fetchResponses();
		}
	}, [props.videoId])
	
	const [result, setResult] = useState([]);
	const [curr, setCurr] = useState({});
	useEffect(() => {
		setResult(mergeQuestionResponseForStepper(questions, responses));
		console.log(result);

		setCurr(responses.find(res => res._id === props.responseId));
		console.log(curr)
	}, [responses])


  	return (
		<section className='w-full flex-center flex-col'>
			<div className=' flex-start flex-col self-start mt-4'>
				<h1 className='head_text text-left'>
					{videoDetails.title}
				</h1>
				<p className='desc text-left'>
					{videoDetails.description}
				</p>
			</div>

			<div className='flex_center flex-col w-full gap-4 py-4'>
				{
					result.map((res, idx) => (
						<div className='w-full shadow-lg rounded-md p-4'>
							<h3 className=' text-xl mt-2'>
								{res.question}
							</h3>

							<div
								className='flex flex-col lg:flex-row'
							>
								<div className='w-full flex flex-col gap-2 mt-8'>
									{
										res.options.map((op, i) => (
											<div 
												className={`flex justify-between rounded-md p-1 outline 
													${(questions[idx].options[i].isCorrect) ?
														"outline-2 outline-accent" : 
														"outline-1 outline-slate-500"}
												`}
											
											>
												{op.option}
												{
													(curr.response[idx].options[0] === i) &&
													<span className='text-xs self-end'>
														<i>
															your choice
														</i>
													</span>
												}
											</div>
										))
									}
								</div>

								<div
									className='p-4'
								>
									{
										console.log(res.options.map(r => {
											return {
												x: r.option,
												y: r.count,
												label: r.option
											}
										}))
									}
									<VictoryPie
										data={res.options.map(r => {
											return {
												x: r.option,
												y: r.count
											}
										})}

										labels={({ datum }) => `${datum.x}(${datum.y})`}

										innerRadius={100}
										padAngle={5}
										style={{
											data: {
												fillOpacity: 0.9, stroke: "#2A323C", strokeWidth: 2
											},
											labels: {
												fontSize: 18, fill: "#A6ADBB"
											}
										}}
									/>
								</div>
							</div>
						</div>
					))
				}
			</div>

		</section>
  	)
}

export default ClientResult;