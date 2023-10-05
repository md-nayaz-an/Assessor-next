"use client";

import { createResponseState } from '@recoil/atoms/responseAtom';
import { updateResponseSelector } from '@recoil/selectors/updateResponseSelector';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

const QuizComp = (props) => {
    
    const [selected, setSelected] = useState(-1);
    const setResponse = useSetRecoilState(updateResponseSelector);

    const onSave = () => {
        console.log(props.videoId);
        console.log(props.question._id);
        console.log([selected]);

        const updateValue = {
            status: (selected === -1) ? 1 : 2,
            options: (selected === -1) ? [] : [selected]
        }

        setResponse({
            videoId: props.videoId, 
            questionId: props.question._id,
            updatedValues: updateValue
        });

        props.onNext();
    }

    const onSkip = () => {
        console.log(props.videoId);
        console.log(props.question._id);
        console.log([selected]);

        const updateValue = {
            status: 1,
            options: []
        }

        setResponse({
            videoId: props.videoId, 
            questionId: props.question._id,
            updatedValues: updateValue
        });

        props.onNext();
    }

    return (
        <div className='pb-48 w-full flex-center flex-col relative lg:pb-20'>
            <div className='p-4 w-full flex-center flex-col gap-2'>
                <div className='max-w-full self-start text-2xl font-bold'>{props.question?.title}</div>
                <div className='max-w-full self-start text-lg font-semibold'>{props.question?.question}</div>
                
                <ul className='w-full mx-4 menu bg-base-200 rounded-box gap-2'>
                    {
                        props.question?.options.map((o) => (
                            <li 
                                className={`border border-slate-500 rounded-lg 
                                ${(o.optionId === selected) ? ' bg-neutral' : ""}`}
                                onClick={() => {
                                    setSelected(o.optionId)
                                }}
                            >
                                <a>
                                    {o.option}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className='bottom-0 w-full gap-x-2 gap-y-6 flex-wrap flex justify-between lg:justify-end lg:relative'>
                <button 
                    className='btn w-2/5 lg:w-32 left-0 lg:absolute'
                    onClick={() => setSelected(-1)}
                >
                    Reset
                </button>
                <button
                    className='btn btn-neutral w-2/5 lg:w-32'
                    onClick={onSkip}
                >
                    Skip
                </button>
                <button 
                    className='btn btn-accent w-full lg:w-44'
                    onClick={onSave}
                >
                    Save and Next
                </button>
            </div>
        </div>
    )
}

export default QuizComp