"use client";

import { getResponseOptionsSelector } from '@recoil/selectors/getResponseOptionsSelector';
import { updateResponseSelector } from '@recoil/selectors/updateResponseSelector';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

const QuizComp = (props) => {

    const session = useSession();

    const [selected, setSelected] = useState(-1);
    const [probability, setProbability] = useState(-1);
    const [thoughts, setThoughts] = useState("");

    const setResponse = useSetRecoilState(updateResponseSelector);
    
    const responseOptions = useRecoilValue(
        getResponseOptionsSelector({
            videoId: props.videoId,
            userid: session?.data?.user?.id,
            questionId: props.question._id
        })
    );

    const onSave = async () => {
        let prevOptions = [...responseOptions];

        if(prevOptions.length === 0 && props.question.type === "question")
            prevOptions = (selected === -1) ? [] : [selected];
        else if(prevOptions.length === 1 && props.question.type === "revise") {
            prevOptions.push(-1);
            prevOptions.push(selected);
        }else if(prevOptions.length === 2 && props.question.type === "revise") {
            prevOptions.push(selected);
        }


        const updateValue = {
            status: (selected === -1) ? 1 : 2,
            options: prevOptions,
            probability,
            thoughts
        }

        setResponse({
            videoId: props.videoId,
            userid: session?.data?.user?.id,
            questionId: props.question._id,
            updatedValues: updateValue
        });

        props.onNext();
    }

    const onSkip = () => {
        let prevOptions = [...responseOptions];

        if(prevOptions.length !== 0 && props.question.type === "revise")
            prevOptions.push(-1);


        const updateValue = {
            options: prevOptions,
        }

        setResponse({
            videoId: props.videoId,
            userid: session?.data?.user?.id,
            questionId: props.question._id,
            updatedValues: updateValue
        });

        props.onNext();
    }

    return (
        <div className='py-8 lg:px-4 w-full flex-center flex-col relative lg:pb-20'>

            <div className='py-4 w-full flex-center flex-col gap-2'>
                <div className='max-w-full self-start text-2xl font-bold'>
                    {
                        (props.question.type === "revise") &&
                            <span className='text-error text-base'>Do you want to CHANGE your option for the question<br /></span>
                    }
                    {props.question?.title}
                </div>
                <div className='max-w-full self-start text-lg font-semibold'>{props.question?.question}</div>
                
                <ul className='w-full mx-4 menu bg-base-200 rounded-box gap-2'>
                    {
                        props.question?.options.map((o) => (
                            <li 
                                className={`border border-slate-500 rounded-lg 
                                ${(o.optionId === selected) ? ' bg-neutral' : ""}`}
                                onClick={() => {
                                    setSelected(o.optionId);
                                    setProbability(-1);
                                }}
                            >
                                <a>
                                    {o.option}
                                </a>
                            </li>
                        ))
                    }
                </ul>

                <label className="label w-full">
                    {props.question.sliderquestion === "" || props.question.sliderquestion === undefined  ?  
                        "What is your confidence level in making this guess?" :
                        props.question.sliderquestion
                    }
                </label>
                
                <div className="flex-center w-full gap-2">
                    <input 
                        type="range" 
                        min={0} 
                        max="100" 
                        value={probability} 
                        className="range range-xs"
                        onChange={(e) => {
                            setProbability(e.target.value);
                        }}    
                    />
                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="font-mono text-xs">
                            {probability >= 0 ? probability : "NA" }
                        </span>
                    </div>
                </div>
                
                <textarea 
                    className={"textarea textarea-bordered mt-4 w-full " +
                        ((probability > -1 || selected > -1) ?
                        "textarea-accent" : "")
                    }
                    placeholder="*Why do you feel so?"
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    required
                />
            </div>

            <div className='w-full flex-wrap flex justify-between gap-2 lg:-order-1'>
                <button 
                    className='btn w-2/6 lg:w-1/6 lg:-order-1'
                    onClick={() => {
                        setSelected(-1);
                        setProbability(-1);
                    }}
                >
                    Reset
                </button>
                {
                    props.question.type === "revise" && 
                    <button
                        className='btn btn-neutral w-1/5 lg:w-1/6'
                        onClick={onSkip}
                    >
                        Skip
                    </button>
                }
                <button 
                    className='btn btn-accent w-2/6 lg:w-1/6'
                    onClick={onSave}
                    disabled={selected === -1 || probability === -1 || thoughts === ""}
                >
                    Next
                </button>
            </div>

        </div>
    )
}

export default QuizComp