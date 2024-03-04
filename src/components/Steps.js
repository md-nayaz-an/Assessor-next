import formatTooltipString from '@utils/formatTooltipString';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

function getStatusClass(status) {
    switch (status) {
		case 1:
			return 'step-neutral';
		case 2:
			return 'step-accent';
		case 3:
			return 'step-error';
		case 4:
			return 'step-warning';
		default:
			return '';
	}
}

const Steps = (props) => {
	const [processedResponse, setProcessedResponse] = useState([]);

	const fetchProcessedResponses = async () => {
		const res = await fetch('/api/analytics/' + props.videoId, {
            cache: 'no-store'
        });
		const data = await res.json();
		setProcessedResponse(data);
		//console.log(data);
	}

    useEffect(() => {
		fetchProcessedResponses();
    }, [])

    return (
        <div className="flex-center">
            <ul className="steps overflow-visible">
                {
                    props.responses.response.map((response, index) => (
                    	<li
                            key={index}
                            className={`step ${
                                getStatusClass(response.status)
                            }
                            {//${(index == props.current) ? 'after:border' : ''}}
                            step-${index}`}
                    	>
							{
							(response.status >= 2) &&
								<Tooltip
									anchorSelect={`.step-${index}`}
								>
									<div className=' flex flex-col text-left'>
									<h3 className=' text-lg'>{processedResponse[index].question}</h3>
									{
										processedResponse[index].options.map( res => (
										<span>{`${res.count} chose '${res.option}'`}</span>
										))
									}
									</div>
								</Tooltip>
						}
						</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Steps;