"use client";

import mergeQuestionResponse from '@utils/mergeQuestionResponse';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { VictoryLabel, VictoryPie } from 'victory';

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
		setResult(mergeQuestionResponse(questions, responses));

		setCurr(responses.find(res => res._id === props.responseId));
		console.log(result);
		console.log(curr)
	}, [responses])

	useEffect(() => {
		const containers = document.querySelectorAll('.VictoryContainer');

		containers.forEach(container => {
			const svg = container.querySelector('svg');
			if (svg) {
				console.log("mod");
				svg.style.overflow = 'visible';
			}
	    });
	}, [result]);

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
								className='flex flex-col'
							>
								<div className='w-full flex flex-col gap-2 mt-8'>
									{
										res.options?.map((op, i) => (
											<div 
												className={`flex justify-between rounded-md p-1 outline 
													${(questions[idx].options[i].isCorrect) ?
														"outline-2 outline-accent" : 
														"outline-1 outline-slate-500"}
												`}
											
											>
												{op.option}
												{
													(curr.response[idx]?.options[0] === i) &&
													<span className='text-xs self-end'>
														<i>
															your choice
														</i>
													</span>
												}
											</div>
										))
									}

									<div
										className='mt-8'
									>
										{ `Your selection, "${result[idx].options[curr.response[idx]?.options[0]]?.option}" was chosen by 
											${(( result[idx].options[curr.response[idx]?.options[0]]?.count / result[idx].options.reduce((acc, d) => acc + d.count, 0)) * 100).toFixed(2)}%` 
										}
									</div>
								</div>

								<div
									className='m-16'
								>
									{
										console.log(res.options?.map((r, i) => {
											return {
												x: r.option,
												y: r.count,
												color: (questions[idx].options[i].isCorrect) ? '#00CDB8' :
														(curr.response[idx]?.options[0] === i) ? '#A6ADBB' : ""
											}
										}))
									}
									<VictoryPie
										data={res.options?.map((r, i) => {
											return {
												x: r.option,
												y: r.count,
												color: (questions[idx].options[i].isCorrect) ? '#00CDB8' :
														(curr.response[idx]?.options[0] === i) ? '#A6ADBB' : ""
											}
										})}

										labelComponent={<CustomLabel />}
										colorScale={res.options.map((r, i) => {
											return (questions[idx].options[i].isCorrect) ? '#00CDB8' :
														(curr.response[idx]?.options[0] === i) ? '#A6ADBB' : ""
										})}

										innerRadius={({ datum }) => (datum.color === "#A6ADBB") ? 60 : 50}
										radius={({ datum }) => (datum.color === "#A6ADBB") ? 110 : 100}
										padAngle={5}
										
										height={400}
										width={1800}
										style={{
											data: {
												fillOpacity: 0.9, stroke: "#2A323C", strokeWidth: 2
											},
											labels: {
												fontSize: 18, fill: "#A6ADBB"
											},
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
const CustomLabel = (props) => {
	const maxLineLength = 25; // Adjust this value based on your requirements
    const percentage = ((props.datum.y / props.data.reduce((acc, d) => acc + d.y, 0)) * 100).toFixed(2) + '%';

    // Split the text into multiple lines using the breakTextIntoLines function
    const lines = breakTextIntoLines(props.datum.x, maxLineLength).map((line, index) => (
        <tspan key={index} x={props.x} dy={index === 0 ? 0 : '1.2em'}>
            {line}
        </tspan>
    ));
	lines.push(<tspan x={props.x} dy="1.4em">
					({percentage})
				</tspan>);

    return (
        <g>
            <VictoryLabel {...props} text={lines} />
            <tspan x={props.x} dy="1.2em">
                {percentage}
            </tspan>
        </g>
    );
};

const breakTextIntoLines = (text, maxLineLength) => {
    const words = text.split(' ');
    let currentLine = '';
    const lines = [];

    for (const word of words) {
        if ((currentLine + word).length <= maxLineLength) {
            currentLine += (currentLine === '' ? '' : ' ') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine !== '') {
        lines.push(currentLine);
    }

    return lines;
};
export default ClientResult;