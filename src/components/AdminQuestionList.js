'use client';

import { appendQuestionDataSelector } from '@recoil/selectors/appendQuestionDataSelector';
import { deleteQuestionDataSelector } from '@recoil/selectors/deleteQuestionDataSelector';
import { updateQuestionDataSelector } from '@recoil/selectors/updateQuestionDataSelector';
import timeStampParser from '@utils/timeStampParser';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const AdminQuestionList = (props) => {

    const [checked, setChecked] = useState(-1);


    const setNewQuestion = useSetRecoilState(appendQuestionDataSelector);
    const updateQuestion = useSetRecoilState(updateQuestionDataSelector);
    const deleteQuestion = useSetRecoilState(deleteQuestionDataSelector);

    const AddNewMarker = () => {
        setNewQuestion({
            videoId: props.videoId,
            newData: {
                localId: props.localQuestions.length,
                timestamp: props.videoProgress.playedSeconds,
                videoid: props.videoId,
                title: "New Title",
                summary: "",
                question:"",
                options: [],
                sliderquestion: "",
                followUps: [],
            }
        })
    }

    useEffect(() => {
      console.log(props.localQuestions);
    
    }, [props.localQuestions])
    
    return (
        <>
            <div className='max-h-80 w-full overflow-auto'>
                <div
                    className='w-full overflow-auto flex flex-col gap-2'
                >
                    {
                        props.localQuestions.map((question, index) => (
                            <ListComp
                                question={question}
                                index={question.localId}
                                key={question.localId}
                                checked={checked}
                                setChecked={setChecked}
                                updateQuestion={updateQuestion}
                                deleteQuestion={deleteQuestion}
                                videoId={props.videoId}
                            />
                        ))
                    }

                    {
                        props.cloudQuestions.map((question, index) => (
                            <ListComp
                                question={question}
                                index={question._id}
                                key={question._id}
                                checked={checked}
                                setChecked={setChecked}
                                updateQuestion={updateQuestion}
                                deleteQuestion={deleteQuestion}
                                videoId={props.videoId}
                                cloud={true}
                            />
                        ))
                    }
                </div>
            </div>

            <div className='w-full flex flex-row justify-evenly order-first lg:order-last'>
                <div className="grid grid-flow-col text-center auto-cols-max join">
                    <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                        <span className="ml-2 countdown font-mono text-xl">
                            <span style={{"--value": Math.floor(props.videoProgress.playedSeconds / 60)}}></span>
                        </span>
                    </div>
                    
                    <div className="flex-center flex-col py-2 bg-neutral text-neutral-content text-xs join-item">
                        <span className="countdown font-mono text-xl">
                            :
                        </span>
                    </div>
                    
                    <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                        <span className="countdown font-mono text-xl mr-2">
                            <span style={{"--value": Math.floor(props.videoProgress.playedSeconds) % 60}}></span>
                        </span>
                    </div>
                </div>

                <button className="btn btn-circle" onClick={() => props.onSeekBackward()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path xmlns="http://www.w3.org/2000/svg" d="M7 5V19M17 7.329V16.671C17 17.7367 17 18.2695 16.7815 18.5432C16.5916 18.7812 16.3035 18.9197 15.9989 18.9194C15.6487 18.919 15.2327 18.5861 14.4005 17.9204L10.1235 14.4988C9.05578 13.6446 8.52194 13.2176 8.32866 12.7016C8.1592 12.2492 8.1592 11.7508 8.32866 11.2984C8.52194 10.7824 9.05578 10.3554 10.1235 9.50122L14.4005 6.07961C15.2327 5.41387 15.6487 5.081 15.9989 5.08063C16.3035 5.0803 16.5916 5.21876 16.7815 5.45677C17 5.73045 17 6.2633 17 7.329Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <button className="btn btn-circle btn-primary" onClick={() => props.setPlay(prevPlay => !prevPlay)}>
                    {
                        (props.play) ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path xmlns="http://www.w3.org/2000/svg" d="M8 5V19M16 5V19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    }
                </button>

                <button className="btn btn-circle" onClick={() => props.onSeekForward()}>
                   
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path xmlns="http://www.w3.org/2000/svg" d="M17 5V19M7 7.329V16.671C7 17.7367 7 18.2695 7.21846 18.5432C7.40845 18.7812 7.69654 18.9197 8.00108 18.9194C8.35125 18.919 8.76734 18.5861 9.59951 17.9204L13.8765 14.4988C14.9442 13.6446 15.4781 13.2176 15.6713 12.7016C15.8408 12.2492 15.8408 11.7508 15.6713 11.2984C15.4781 10.7824 14.9442 10.3554 13.8765 9.50122L9.59951 6.07961C8.76734 5.41387 8.35125 5.081 8.00108 5.08063C7.69654 5.0803 7.40845 5.21876 7.21846 5.45677C7 5.73045 7 6.2633 7 7.329Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <button 
                    className="btn"
                    onClick={AddNewMarker}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20V22ZM12.4453 4.01216C12.9968 4.04235 13.4683 3.61979 13.4985 3.06833C13.5287 2.51687 13.1061 2.04535 12.5547 2.01515L12.4453 4.01216ZM11.7627 9.23726L11.0556 8.53015L11.7627 9.23726ZM17.411 3.58902L18.1181 4.29613L17.411 3.58902ZM9 15L8.01005 14.8586C7.96411 15.1802 8.07723 15.504 8.3134 15.727C8.54957 15.9501 8.87936 16.0445 9.19778 15.9802L9 15ZM9.04745 14.6678L8.0575 14.5264L8.0575 14.5264L9.04745 14.6678ZM9.48793 14.9016L9.29015 13.9213L9.48793 14.9016ZM12.8012 13.7247L12.2287 12.9048H12.2287L12.8012 13.7247ZM11.564 14.3882L11.9302 15.3187H11.9302L11.564 14.3882ZM10.1791 10.9786L9.34943 10.4203V10.4203L10.1791 10.9786ZM9.49029 12.3561L8.54586 12.0274V12.0274L9.49029 12.3561ZM16.7071 4.29289C16.3166 3.90237 15.6834 3.90237 15.2929 4.29289C14.9024 4.68342 14.9024 5.31658 15.2929 5.70711L16.7071 4.29289ZM18.1213 8.53553C18.5118 8.92606 19.145 8.92606 19.5355 8.53553C19.9261 8.14501 19.9261 7.51184 19.5355 7.12132L18.1213 8.53553ZM16 16C15.4477 16 15 16.4477 15 17C15 17.5523 15.4477 18 16 18V16ZM21.88 10.8011C21.7701 10.2598 21.2423 9.91012 20.701 10.02C20.1598 10.1299 19.8101 10.6577 19.92 11.1989L21.88 10.8011ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 4C12.1495 4 12.298 4.00409 12.4453 4.01216L12.5547 2.01515C12.371 2.00509 12.186 2 12 2V4ZM12.4698 9.94436L18.1181 4.29613L16.7039 2.88191L11.0556 8.53015L12.4698 9.94436ZM19.5323 5.71034L13.6703 11.5723L15.0845 12.9865L20.9465 7.12455L19.5323 5.71034ZM9.98995 15.1414L10.0374 14.8093L8.0575 14.5264L8.01005 14.8586L9.98995 15.1414ZM9.29015 13.9213L8.80222 14.0198L9.19778 15.9802L9.68571 15.8818L9.29015 13.9213ZM13.6703 11.5723C12.8844 12.3582 12.5736 12.664 12.2287 12.9048L13.3737 14.5447C13.8964 14.1797 14.3472 13.7239 15.0845 12.9865L13.6703 11.5723ZM9.68571 15.8818C10.7079 15.6755 11.3371 15.5522 11.9302 15.3187L11.1977 13.4577C10.8064 13.6118 10.3796 13.7015 9.29015 13.9213L9.68571 15.8818ZM12.2287 12.9048C11.9079 13.1288 11.5618 13.3144 11.1977 13.4577L11.9302 15.3187C12.44 15.1181 12.9245 14.8583 13.3737 14.5447L12.2287 12.9048ZM11.0556 8.53015C10.243 9.34283 9.74031 9.83942 9.34943 10.4203L11.0087 11.5369C11.2665 11.1538 11.6034 10.8108 12.4698 9.94436L11.0556 8.53015ZM10.0374 14.8093C10.2107 13.5963 10.2829 13.121 10.4347 12.6848L8.54586 12.0274C8.31572 12.6886 8.22004 13.3887 8.0575 14.5264L10.0374 14.8093ZM9.34943 10.4203C9.01364 10.9192 8.74356 11.4594 8.54586 12.0274L10.4347 12.6848C10.5759 12.2791 10.7688 11.8933 11.0087 11.5369L9.34943 10.4203ZM19.5323 4.29613C19.9228 4.68665 19.9228 5.31981 19.5323 5.71034L20.9465 7.12455C22.1181 5.95298 22.1181 4.05348 20.9465 2.88191L19.5323 4.29613ZM20.9465 2.88191C19.7749 1.71034 17.8754 1.71034 16.7039 2.88191L18.1181 4.29613C18.5086 3.9056 19.1418 3.9056 19.5323 4.29613L20.9465 2.88191ZM15.2929 5.70711L18.1213 8.53553L19.5355 7.12132L16.7071 4.29289L15.2929 5.70711ZM20 12C20 14.2091 18.2091 16 16 16V18C19.3137 18 22 15.3137 22 12H20ZM19.92 11.1989C19.9723 11.4569 20 11.7247 20 12H22C22 11.5903 21.9588 11.1893 21.88 10.8011L19.92 11.1989Z"/>
                    </svg>
                    Add Marker
                </button>
            </div>
        </>
    )
}

export const ListComp = (props) => {

    const [question, setQuestion] = useState(props.question);
    const [options, setOptions] = useState(props.question.options);
    const [followUps, setfollowUps] = useState(props.question.followUps || []);
    const [correct, setCorrect] = useState(-1);

    useEffect(() => {
        console.log(question);
    }, [question])

    const update = () => {
        props.updateQuestion({
            videoId: props.videoId,
            index: props.index,
            updatedData: {
                ...question,
                options: options
            },
        })
    }

    const onDelete = () => {
        if(props.videoId)
            props.deleteQuestion({
                videoId: props.videoId,
                localId: question.localId
            })
    }

    return (
        <div 
            className="collapse collapse-arrow bg-base-200 min-h-16"
            
        >
            <input 
                type="radio" 
                name="my-accordion-2" 
                checked={(props.checked === props.index)}
                onClick={() => {
                        if(props.checked === props.index)
                                props.setChecked(-1)
                        else
                            props.setChecked(props.index)
                }}
            />

            <div className="collapse-title text-xl font-medium flex justify-between items-center w-full">
                <div className='flex items-center gap-4'>
                    <div className='bg-neutral px-2 rounded-md text-neutral-content text-xl flex-center text-center'>
                        {timeStampParser(question.timestamp)}
                    </div>
                    {question.title}
                    {
                        !props.cloud &&
                        <div className="badge badge-accent">Local</div>
                    }
                </div>
                
            </div>
            <div className="collapse-content max-h-fit">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter Title" 
                        className="input input-bordered w-full"
                        value={question.title}
                        onChange={(e) => setQuestion(q => ({
                            ...q,
                            title: e.target.value
                        }))}
                        
                        disabled={props.cloud}
                    />
                    
                    <label className="label mt-4">
                        <span className="label-text">Summary</span>
                    </label>
                    <textarea 
                        type="text" 
                        placeholder="Enter Summary" 
                        className="textarea textarea-bordered h-24 w-full" 
                        value={question.summary}
                        onChange={(e) => setQuestion(q => ({
                            ...q,
                            summary: e.target.value
                        }))}
                        
                        disabled={props.cloud}
                    />

                    <label className="label">
                        <span className="label-text">Question</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter Question"
                        className="input input-bordered w-full"
                        value={question.question}
                        onChange={(e) => setQuestion(q => ({
                            ...q,
                            question: e.target.value
                        }))}
                        
                        disabled={props.cloud}
                    />

                    {
                        options?.map((option, index) => (
                            <ListOptions
                                index={index}
                                option={option}
                                setOptions={setOptions}
                                key={index}
                                cloud={props.cloud}
                                correct={correct}
                                setCorrect={setCorrect}
                            />
                        ))
                    }
                    {
                        !props.cloud &&

                        <button
                            className='btn btn-sm m-2'
                            onClick={() => 
                                setOptions(prevOptions => ([
                                        ...prevOptions,
                                        {
                                            optionId: prevOptions.length,
                                            option: "",
                                            isCorrect: false
                                        }
                                ]))}
                        >
                        Add option
                    </button>

                    }
                    <label className="label">
                        <span className="label-text">Slider Question</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter Slider Question" 
                        className="input input-bordered w-full"
                        value={props.cloud && question.sliderquestion === "" || question.sliderquestion === undefined ? "(DEFAULT)What is your confidence level in making this guess" : question.sliderquestion }
                        onChange={(e) => setQuestion(q => ({
                            ...q,
                            sliderquestion: e.target.value
                        }))}
                        
                        disabled={props.cloud}
                    />

                    <label className="label mt-4">
                        <span className="label-text">Follow Ups</span>
                    </label>
                    {
                        followUps?.map((followUp, index) => (
                            <FollowUpOptions
                                index={index}
                                followUp={followUp}
                                setfollowUps={setfollowUps}
                                key={index}
                                cloud={props.cloud}
                            />
                        ))
                    }
                    {
                        !props.cloud &&

                        <button
                            className='btn btn-circle btn-secondary m-4 w-1/3'
                            onClick={() =>
                                setfollowUps(prevFollowUps => ([
                                        ...prevFollowUps,
                                        {
                                            showBet: true,
                                            betQuestion: "",
                                            points: 0,
                                            gain: 0.0,
                                            loss: 0.0,
                                            popup: question.timestamp + 1,
                                            showRevision: true,
                                            revisePopup: question.timestamp + 2,
                                        }
                                ]))}
                        >
                            Add FollowUps
                        </button>

                    }
                

                </div>

                {
                    !props.cloud &&

                    <div className='my-8 px-4 w-full flex-center gap-4'>
                        <button 
                            className="btn w-1/2"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                        
                        <button 
                            className="btn btn-primary w-1/2" 
                            type='submit'
                            onClick={update}
                        >
                            Save
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

const FollowUpOptions = (props) => {

    const handleBetPopup = (dur) => {
        props.setfollowUps(prevFollowUps => [
            ...prevFollowUps.slice(0, props.index),
            {
                ...prevFollowUps[props.index],
                popup: prevFollowUps[props.index].popup + dur
            },
            ...prevFollowUps.slice(props.index + 1)
        ]);
    }
    const handleRevisePopup = (dur) => {
        props.setfollowUps(prevFollowUps => [
            ...prevFollowUps.slice(0, props.index),
            {
                ...prevFollowUps[props.index],
                revisePopup: prevFollowUps[props.index].revisePopup + dur
            },
            ...prevFollowUps.slice(props.index + 1)
        ]);
    }

    return (
        <div
            className='w-full border border-neutral rounded-md my-2 p-2'
        >   
            <label className="label cursor-pointer w-1/3">
                <span className="label-text">Include Bets</span> 
                <input 
                    type="checkbox" 
                    checked={props.followUp.showBet}
                    className="checkbox"
                    onChange={(e) => {
                        props.setfollowUps(prevFollowUps => [
                            ...prevFollowUps.slice(0, props.index),
                            {
                                ...prevFollowUps[props.index],
                                showBet: e.target.checked
                            },
                            ...prevFollowUps.slice(props.index + 1)
                        ]);
                    }}
                />
            </label>
            
            {   
                 props.followUp.showBet &&
                <>
                    <label className="label">
                        <span className="label-text">Betting Question</span>
                    </label>
                    <input
                        type="text" 
                        placeholder={"Enter Bet Question"}
                        className="input input-bordered w-full max-w-lg"
                        value={props.followUp.betQuestion}
                        onChange={(e) => {
                            props.setfollowUps(prevFollowUps => [
                                ...prevFollowUps.slice(0, props.index),
                                {
                                    ...prevFollowUps[props.index],
                                    betQuestion: e.target.value
                                },
                                ...prevFollowUps.slice(props.index + 1)
                            ]);
                        }}
                        disabled={props.cloud}
                    />

                    <label className="label">
                        <span className="label-text">Points at stake</span>
                    </label>
                    <input
                        type="text" 
                        placeholder={"Enter Points"}
                        className="input input-bordered w-full max-w-lg"
                        value={props.followUp.points}
                        onChange={(e) => {
                            let val = e.target.value
                            val = val === "" ? 0 : val;
                            if(!isNaN(parseFloat(val)) && isFinite(val))
                                props.setfollowUps(prevFollowUps => [
                                    ...prevFollowUps.slice(0, props.index),
                                    {
                                        ...prevFollowUps[props.index],
                                        points: parseFloat(val)
                                    },
                                    ...prevFollowUps.slice(props.index + 1)
                            ]);
                        }}
                        disabled={props.cloud}
                    />
                    <div
                        className='flex flex-row'
                    >
                        <div
                            className='p-2 w-1/2'
                        >
                            <label className="label">
                                <span className="label-text">Gain Percentage</span>
                            </label>
                            <input
                                type="text" 
                                placeholder={"Enter Points"}
                                className="input input-bordered w-full max-w-lg"
                                value={props.followUp.gain}
                                onChange={(e) => {
                                    let val = e.target.value
                                    val = val === "" ? 0 : val;
                                    if(!isNaN(parseFloat(val)) && isFinite(val))
                                        props.setfollowUps(prevFollowUps => [
                                            ...prevFollowUps.slice(0, props.index),
                                            {
                                                ...prevFollowUps[props.index],
                                                gain: parseFloat(val)
                                            },
                                            ...prevFollowUps.slice(props.index + 1)
                                    ]);
                                }}
                                disabled={props.cloud}
                            />
                        </div>
                        <div
                            className='p-2 w-1/2'
                        >
                            <label className="label">
                                <span className="label-text">Loss Percentage</span>
                            </label>
                            <input
                                type="text" 
                                placeholder={"Enter Points"}
                                className="input input-bordered w-full max-w-lg"
                                value={props.followUp.loss}
                                onChange={(e) => {
                                    let val = e.target.value
                                    val = val === "" ? 0 : val;
                                    if(!isNaN(parseFloat(val)) && isFinite(val))
                                        props.setfollowUps(prevFollowUps => [
                                            ...prevFollowUps.slice(0, props.index),
                                            {
                                                ...prevFollowUps[props.index],
                                                loss: parseFloat(val)
                                            },
                                            ...prevFollowUps.slice(props.index + 1)
                                    ]);
                                }}
                                disabled={props.cloud}
                            />
                        </div>
                    </div>
                    <div
                        className='flex flex-row'
                    >
                        <div
                            className='p-2 w-1/2'
                        >
                            <label className="label">
                                <span className="label-text">Bet Question At Duration</span>
                            </label>
                            <div
                                className='flex gap-2'
                            >
                                <div className="grid grid-flow-col text-center auto-cols-max join">
                                    <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                                        <span className="ml-2 countdown font-mono text-xl">
                                            <span style={{"--value": Math.floor(props.followUp.popup / 60)}}></span>
                                        </span>
                                    </div>
                                    
                                    <div className="flex-center flex-col py-2 bg-neutral text-neutral-content text-xs join-item">
                                        <span className="countdown font-mono text-xl">
                                            :
                                        </span>
                                    </div>
                                    
                                    <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                                        <span className="countdown font-mono text-xl mr-2">
                                            <span style={{"--value": Math.floor(props.followUp.popup) % 60}}></span>
                                        </span>
                                    </div>
                                </div>

                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleBetPopup(-10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M9.54004 15.92V10.5801L8.04004 12.2501" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.02 4.46997L12 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4.91 7.79999C3.8 9.27999 3.10999 11.11 3.10999 13.11C3.10999 18.02 7.09 22 12 22C16.91 22 20.89 18.02 20.89 13.11C20.89 8.19999 16.91 4.21997 12 4.21997C11.32 4.21997 10.66 4.31002 10.02 4.46002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 10.5801C15.1 10.5801 16 11.4801 16 12.5801V13.9301C16 15.0301 15.1 15.9301 14 15.9301C12.9 15.9301 12 15.0301 12 13.9301V12.5801C12 11.4701 12.9 10.5801 14 10.5801Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleBetPopup(-1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M7 5V19M17 7.329V16.671C17 17.7367 17 18.2695 16.7815 18.5432C16.5916 18.7812 16.3035 18.9197 15.9989 18.9194C15.6487 18.919 15.2327 18.5861 14.4005 17.9204L10.1235 14.4988C9.05578 13.6446 8.52194 13.2176 8.32866 12.7016C8.1592 12.2492 8.1592 11.7508 8.32866 11.2984C8.52194 10.7824 9.05578 10.3554 10.1235 9.50122L14.4005 6.07961C15.2327 5.41387 15.6487 5.081 15.9989 5.08063C16.3035 5.0803 16.5916 5.21876 16.7815 5.45677C17 5.73045 17 6.2633 17 7.329Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleBetPopup(+1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M17 5V19M7 7.329V16.671C7 17.7367 7 18.2695 7.21846 18.5432C7.40845 18.7812 7.69654 18.9197 8.00108 18.9194C8.35125 18.919 8.76734 18.5861 9.59951 17.9204L13.8765 14.4988C14.9442 13.6446 15.4781 13.2176 15.6713 12.7016C15.8408 12.2492 15.8408 11.7508 15.6713 11.2984C15.4781 10.7824 14.9442 10.3554 13.8765 9.50122L9.59951 6.07961C8.76734 5.41387 8.35125 5.081 8.00108 5.08063C7.69654 5.0803 7.40845 5.21876 7.21846 5.45677C7 5.73045 7 6.2633 7 7.329Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleBetPopup(+10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13.98 4.46997L12 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.0899 7.79999C20.1999 9.27999 20.8899 11.11 20.8899 13.11C20.8899 18.02 16.9099 22 11.9999 22C7.08988 22 3.10986 18.02 3.10986 13.11C3.10986 8.19999 7.08988 4.21997 11.9999 4.21997C12.6799 4.21997 13.3399 4.31002 13.9799 4.46002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.54004 15.92V10.5801L8.04004 12.2501" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 10.5801C15.1 10.5801 16 11.4801 16 12.5801V13.9301C16 15.0301 15.1 15.9301 14 15.9301C12.9 15.9301 12 15.0301 12 13.9301V12.5801C12 11.4701 12.9 10.5801 14 10.5801Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </>}

            <label className="label cursor-pointer w-1/3">
                <span className="label-text">Include Revision</span> 
                <input 
                    type="checkbox" 
                    checked={props.followUp.showRevision}
                    className="checkbox"
                    onChange={(e) => {
                        props.setfollowUps(prevFollowUps => [
                            ...prevFollowUps.slice(0, props.index),
                            {
                                ...prevFollowUps[props.index],
                                showRevision: e.target.checked
                            },
                            ...prevFollowUps.slice(props.index + 1)
                        ]);
                    }}
                />
            </label>
            
            {   
                 props.followUp.showRevision &&
                <>
                    <div
                        className='flex flex-row'
                    >
                        <div
                            className='p-2 w-full'
                        >
                            <label className="label">
                                <span className="label-text">Revise Question At Duration</span>
                            </label>
                            <div
                                className='flex gap-2'
                            >
                                <div className="grid grid-flow-col text-center auto-cols-max join">
                                    <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                                        <span className="ml-2 countdown font-mono text-xl">
                                            <span style={{"--value": Math.floor(props.followUp.revisePopup / 60)}}></span>
                                        </span>
                                    </div>
                                    
                                    <div className="flex-center flex-col py-2 bg-neutral text-neutral-content text-xs join-item">
                                        <span className="countdown font-mono text-xl">
                                            :
                                        </span>
                                    </div>
                                    
                                    <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                                        <span className="countdown font-mono text-xl mr-2">
                                            <span style={{"--value": Math.floor(props.followUp.revisePopup) % 60}}></span>
                                        </span>
                                    </div>
                                </div>

                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleRevisePopup(-10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M9.54004 15.92V10.5801L8.04004 12.2501" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.02 4.46997L12 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4.91 7.79999C3.8 9.27999 3.10999 11.11 3.10999 13.11C3.10999 18.02 7.09 22 12 22C16.91 22 20.89 18.02 20.89 13.11C20.89 8.19999 16.91 4.21997 12 4.21997C11.32 4.21997 10.66 4.31002 10.02 4.46002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 10.5801C15.1 10.5801 16 11.4801 16 12.5801V13.9301C16 15.0301 15.1 15.9301 14 15.9301C12.9 15.9301 12 15.0301 12 13.9301V12.5801C12 11.4701 12.9 10.5801 14 10.5801Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleRevisePopup(-1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M7 5V19M17 7.329V16.671C17 17.7367 17 18.2695 16.7815 18.5432C16.5916 18.7812 16.3035 18.9197 15.9989 18.9194C15.6487 18.919 15.2327 18.5861 14.4005 17.9204L10.1235 14.4988C9.05578 13.6446 8.52194 13.2176 8.32866 12.7016C8.1592 12.2492 8.1592 11.7508 8.32866 11.2984C8.52194 10.7824 9.05578 10.3554 10.1235 9.50122L14.4005 6.07961C15.2327 5.41387 15.6487 5.081 15.9989 5.08063C16.3035 5.0803 16.5916 5.21876 16.7815 5.45677C17 5.73045 17 6.2633 17 7.329Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleRevisePopup(+1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M17 5V19M7 7.329V16.671C7 17.7367 7 18.2695 7.21846 18.5432C7.40845 18.7812 7.69654 18.9197 8.00108 18.9194C8.35125 18.919 8.76734 18.5861 9.59951 17.9204L13.8765 14.4988C14.9442 13.6446 15.4781 13.2176 15.6713 12.7016C15.8408 12.2492 15.8408 11.7508 15.6713 11.2984C15.4781 10.7824 14.9442 10.3554 13.8765 9.50122L9.59951 6.07961C8.76734 5.41387 8.35125 5.081 8.00108 5.08063C7.69654 5.0803 7.40845 5.21876 7.21846 5.45677C7 5.73045 7 6.2633 7 7.329Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="btn btn-circle btn-outline text-xl" onClick={() => handleRevisePopup(+10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13.98 4.46997L12 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.0899 7.79999C20.1999 9.27999 20.8899 11.11 20.8899 13.11C20.8899 18.02 16.9099 22 11.9999 22C7.08988 22 3.10986 18.02 3.10986 13.11C3.10986 8.19999 7.08988 4.21997 11.9999 4.21997C12.6799 4.21997 13.3399 4.31002 13.9799 4.46002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.54004 15.92V10.5801L8.04004 12.2501" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14 10.5801C15.1 10.5801 16 11.4801 16 12.5801V13.9301C16 15.0301 15.1 15.9301 14 15.9301C12.9 15.9301 12 15.0301 12 13.9301V12.5801C12 11.4701 12.9 10.5801 14 10.5801Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            {/*
                            <div className="text-center auto-cols-max join w-1/3 h-14">
                                <div className=" flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                                    <span className="ml-2 font-mono text-xl h-full">
                                        <input 
                                            className='input w-full h-full'
                                            value={Math.floor(props.followUp.revisePopup / 60)}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                console.log(Math.floor(props.followUp.revisePopup / 60))
                                                console.log(props.followUp.revisePopup)
                                                
                                            }}
                                        />
                                    </span>
                                </div>
                                
                                <div className="flex-center flex-col py-2 bg-neutral text-neutral-content text-xs join-item">
                                    <span className="font-mono text-xl">
                                        :
                                    </span>
                                </div>
                                
                                <div className="flex-center flex-col p-2 bg-neutral rounded-xl text-neutral-content text-xs join-item">
                                    <span className="font-mono text-xl mr-2 h-full">
                                        <input
                                            className='input w-full h-full'
                                            value={Math.floor(props.followUp.revisePopup) % 60} 
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                console.log(Math.floor(props.followUp.revisePopup) % 60)
                                                console.log(props.followUp.revisePopup)
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                            */}
                        </div>
                    </div>
                </>}

        </div>
    )
}

const ListOptions = (props) => {

    return(
        <div>
            <label className="label">
                <span className="label-text">Option {props.index + 1}</span>
            </label>
            <div
                className='flex items-center gap-2 self-start'
            >
                <input 
                    type="text" 
                    placeholder={"Enter Option " + (props.index + 1)}
                    className="input input-bordered w-full max-w-lg"
                    value={props.option.option}
                    onChange={(e) => {
                        props.setOptions(prevOptions => [
                            ...prevOptions.slice(0, props.index),
                            {
                                ...prevOptions[props.index],
                                option: e.target.value
                            },
                            ...prevOptions.slice(props.index + 1)
                        ]);
                    }}
                    disabled={props.cloud}
                />
                <input 
                    type="radio" 
                    checked={props.option.isCorrect}
                    name='radio-1'
                    className="radio"
                    onChange={() => {
                        props.setCorrect(props.index);
                        props.setOptions(prevOptions => prevOptions.map((option, index) => ({
                            ...option,
                            isCorrect: index === props.correct
                        })));
                    }}
                    disabled={props.cloud}
                />
            </div>
        </div>
    )
}

export default AdminQuestionList