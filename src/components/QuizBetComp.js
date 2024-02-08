"use client";

import { getResponseOptionsSelector } from '@recoil/selectors/getResponseOptionsSelector';
import { updateResponseSelector } from '@recoil/selectors/updateResponseSelector';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

const QuizBetComp = (props) => {

    const session = useSession();

    const [selected, setSelected] = useState(-1);

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

        console.log(prevOptions);

        if(prevOptions.length === 1 && props.question.type === "bet")
            prevOptions.push(selected)

        console.log(prevOptions);

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

    const [remainingTime, setRemainingTime] = useState(props.question.duration); // Initialize with duration

    useEffect(() => {
        let timerId;
        if(props.show)
        timerId = setInterval(() => {
            setRemainingTime(prevRemaining => prevRemaining - 1);
        }, 1000);

        return () => clearInterval(timerId); // Cleanup function to clear interval on unmount
    }, [props.show]);

    useEffect(() => {
        if(remainingTime < 0)
            onSave();
    }, [remainingTime])

    return (
        <div className='py-8 lg:px-4 w-full flex-center flex-col relative lg:pb-20'>

            <div className='py-4 w-full flex-center flex-col gap-2'>
                <progress className="progress w-full h-1 progress-error" value={remainingTime} max={props.question.duration}></progress>
                <div className='max-w-full self-start text-error'>
                    Penalty of "{props.question?.penalty}" points 
                    within {remainingTime}s

                </div>
                <div className='max-w-full self-start text-2xl font-bold'>{props.question?.betQuestion}</div>
                <div className='max-w-full self-start text-base'>for your previous response on "{props.question?.question}"</div>

                <ul className='w-full mx-4 menu bg-base-200 rounded-box gap-2'>
                    <li 
                        className={`border border-slate-500 rounded-lg 
                        ${(selected === 0) ? ' bg-neutral' : ""}`}
                        onClick={() => {
                            setSelected(0);
                        }}
                    >
                        <a>
                            YES
                        </a>
                    </li>
                    <li
                        className={`border border-slate-500 rounded-lg 
                        ${(selected === 1) ? ' bg-neutral' : ""}`}
                        onClick={() => {
                            setSelected(1);
                        }}
                    >
                        <a>
                            NO
                        </a>
                    </li>
                </ul>
                <div className='max-w-full self-start text-lg font-semibold'>Available User Points: {session?.data?.userData?.points || 0}</div>

            </div>
            <div className="stats stats-horizontal shadow max-w-full lg:-order-2">

                    <div className="stat">
                        <div className="stat-title">Stakes</div>
                        <div className="stat-value text-base">{props.question?.points} Points</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Gain</div>
                        <div className="stat-value text-base">{props.question?.gain * 100} %</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Loss</div>
                        <div className="stat-value text-base">{props.question?.loss * 100} %</div>
                    </div>

                </div>
            <div className='w-full flex-wrap flex justify-between gap-2 lg:-order-1'>
                <button 
                    className='btn w-2/5 lg:w-1/6 lg:-order-1'
                    onClick={() => {
                        setSelected(-1);
                    }}
                >
                    Reset
                </button>
                <button 
                    className='btn btn-accent w-2/5 lg:w-1/6'
                    onClick={onSave}
                    disabled={selected === -1}
                >
                    Next
                </button>
            </div>

        </div>
    )
}

export default QuizBetComp