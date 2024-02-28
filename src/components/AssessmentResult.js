'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const AssessmentResult = (props) => {

    const [responses, setResponses] = useState([]);
    const [videoDetails, setVideoDetails] = useState({});
    const [questions, setQuestions] = useState([]);
    const [curr, setCurr] = useState(0);

    const fetchResponses = async (page = 1, perPage = 25) => {
        const res = await fetch(`/api/analytics/responses/${props.videoId}?page=${page}&perPage=${perPage}`, {
            //cache: 'no-store'
        });

        if(!res.ok)
            return

        const data = await res.json();
        setResponses(data);
    }

    const fetchVideoDetails = async () => {
        const res = await fetch(`/api/videos/getDetails/${props.videoId}`, {
            //cache: 'no-store'
        });

        if(!res.ok)
            return

        const data = await res.json();
        setVideoDetails(data.video);
        setQuestions(data.questions);
    }

    useEffect(() => {
        fetchResponses(1, 25);
        fetchVideoDetails();
    }, []);

    const renderPaginationButtons = () => {
        const { totalPages, page } = responses;

        if (totalPages <= 1) {
            return null; // Don't render pagination buttons if there's only one page
        }

        const currentPage = parseInt(page) || 1; // Convert the page to a number

        const addPageButton = (pageNumber) => (
            <button
                key={pageNumber}
                className={`join-item btn ${currentPage === pageNumber ? 'btn-active' : ''}`}
                onClick={() => fetchResponses(pageNumber, 25)}
            >
                {pageNumber}
            </button>
        );

        return (
            <>
                {/* Directly include the first page */}
                <button
                    key={1}
                    className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`}
                    onClick={() => fetchResponses(1, 25)}
                >
                    1
                </button>

                {totalPages > 2 && currentPage > 2 && (
                    // If the current page is not the second page, include "..." placeholder
                    <button key="ellipsis-start" className="join-item btn btn-disabled" disabled>
                        ...
                    </button>
                )}

                {/* Include pages around the current page */}
                {Array.from({ length: Math.min(3, totalPages - 1) }, (_, i) => currentPage + i - 1).map((i) => {
                    if(i <= 1 || i >= totalPages) return;
                    return addPageButton(i);
                })}

                {totalPages > 2 && currentPage < totalPages - 1 && (
                    // If the current page is not the second-to-last page, include "..." placeholder
                    <button key="ellipsis-end" className="join-item btn btn-disabled" disabled>
                        ...
                    </button>
                )}

                {/* Directly include the last page */}
                <button
                    key={totalPages}
                    className={`join-item btn ${currentPage === totalPages ? 'btn-active' : ''}`}
                    onClick={() => fetchResponses(totalPages, 25)}
                >
                    {totalPages}
                </button>
            </>
        );
    };

    return (
        <div className='w-full h-[75vh] p-4 rounded shadow-lg flex flex-col'>
            <div
                className='flex justify-between'
            >
                <h1 className='text-xl m-2'>
                    {videoDetails?.title}
                    <button
                        className='btn btn-ghost btn-xs'
                    >
                        <Link href={"/admin/assessments/" + videoDetails?._id} target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path xmlns="http://www.w3.org/2000/svg" id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>    
                            </svg>
                        </Link>
                    </button>
                </h1>

                {
                    <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={e => setCurr(e.target.value)}
                        value={curr}
                    >
                        {
                            questions.map((question, index) => (
                                <option
                                    key={index}
                                    value={index}
                                >
                                    {(index + 1 + ") ") + question.question}
                                </option>
                            ))
                        }
                    </select>
                }
            </div>
            <div className="overflow-auto my-2">
                <table className="table table-pin-rows">
                    <thead>
                        <tr className="bg-base-200">
                            <th>{" "}</th>
                            <th>Name</th>
                            <th>Attempted on</th>
                            <th
                                className='text-center'
                                colSpan={questions[curr]?.options.length}
                            >
                                <p
                                    className={`whitespace-pre-line line-clamp-3 hover:overflow-visible`}
                                >
                                    {questions[curr]?.question}
                                </p>
                            </th>
                            <th>
                                <p
                                    className={`whitespace-pre-line line-clamp-3 hover:overflow-visible`}
                                >
                                    {questions[curr]?.sliderquestion}
                                </p>
                            </th>
                            <th>
                                Thoughts
                            </th>
                            <th>
                                Bet
                            </th>
                        </tr>
                        <tr className="">
                            <th>{" "}</th>
                            <th>{" "}</th>
                            <th>{" "}</th>
                            {
                                questions[curr]?.options?.map((option, index) => (
                                    <th
                                        className='h-16 max-w-xs'
                                    >
                                        <p
                                            className={`whitespace-pre-line line-clamp-3 hover:overflow-visible`}
                                        >
                                            {option.option}
                                        </p>
                                        {
                                            option.isCorrect &&
                                            <div className="badge badge-xs badge-outline badge-accent">True</div>
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody
                        className='text-base'
                    >
                        {
                            responses.responses?.map((response, index) => (
                                <tr>
                                    <th>{(responses.page - 1) * responses.perPage + index + 1}</th>
                                    <td>
                                        <div
                                            className='flex flex-col gap-2'
                                        >
                                            <span className='font-bold'>{response.name || response.userid?.name}</span>
                                            {
                                                (response.mail || response.userid?.email) && 
                                                <span className='text-sm'>{response.mail || response.userid?.email}</span>
                                            }
                                            <span className='text-sm'>{response.userid?.phone || "?"}</span>
                                        
                                            <div
                                                className='flex flex-row gap-1'
                                            >
                                                <span className='badge text-xs'>{response.userid?.age || "?"}</span>
                                                <span className='badge text-xs'>{response.userid?.gender || "?"}</span>
                                                <span className='badge badge-ghost text-xs'>{response.userid?.points}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='text-sm'>{new Date(response.timestamp).toLocaleString()}</span>
                                    </td>

                                    {
                                        questions[curr]?.options?.map((option, index) => (
                                            <td className='text-center align-middle gap-2'>
                                                {
                                                    (response?.response[curr]?.options[0] == index) &&
                                                    <span className="indicator-item indicator-middle indicator-center badge badge-xs badge-primary self-center m-1"></span>
                                                }
                                                {
                                                    (response?.response[curr]?.options[2] == index) &&
                                                    <span className="indicator-item indicator-middle indicator-center badge badge-xs badge-secondary self-center m-1"></span>
                                                }
                                            </td>
                                        ))
                                    }
                                    <td>
                                        {response?.response[curr]?.probability}
                                    </td>
                                    <td>
                                        {response?.response[curr]?.thoughts}
                                    </td>
                                    <td>
                                        {(response?.response[curr]?.options[1] &&
                                            response?.response[curr]?.options[1] == 0) ?
                                            "Yes" : "No"
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div
                className='flex justify-between'
            >
                <div />
                <div className="join self-center">
                    {renderPaginationButtons()}
                </div>
                <div className='flex flex-col mx-4'>
                    <div
                        className='flex items-center'
                    >
                        <span className="indicator-item indicator-middle indicator-center badge badge-xs badge-primary self-center m-1"></span>
                        First
                    </div>
                    <div
                        className='flex items-center'
                    >
                        <span className="indicator-item indicator-middle indicator-center badge badge-xs badge-secondary self-center m-1"></span>
                        Second
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssessmentResult
