'use client';

import { responsesAtom } from '@recoil/atoms/responsesAtom';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

const ResponseTable = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [responses, setResponses] = useRecoilState(responsesAtom);

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const fetchResponses = async (page = 1, perPage = 25) => {
        const res = await fetch(`/api/responses?page=${page}&perPage=${perPage}`, {
            //cache: 'no-store'
        });

        const data = await res.json();
        setResponses(data);
    }

    useEffect(() => {
        fetchResponses(1, 25);
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
            <h1 className='text-lg'>
                Responses
            </h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>{" "}</th>
                        <th>Name</th>
                        <th>Assessment Title</th>
                        <th>Attempted on</th>
                        <th>{" "}</th>
                    </tr>
                    </thead>
                    <tbody
                        className='text-base'
                    >
                        {
                            responses.responses?.map((response, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div
                                            className='flex flex-col gap-1'
                                        >
                                            <span className='mx-2'>{response.name || response.userid?.name}</span>
                                            {
                                                (response.mail || response.userid?.email) && 
                                                <span className='badge text-xs'>{response.mail || response.userid?.email}</span>
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className='flex'
                                        >
                                            {response.videoid?.title}
                                            <button
                                                className='btn btn-ghost btn-xs'
                                            >
                                                <Link href={"/admin/assessments/" + response.videoid?._id} target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path xmlns="http://www.w3.org/2000/svg" id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>    
                                                    </svg>
                                                </Link>
                                            </button>
                                        </div>
                                    </td>
                                    <td>{new Date(response.timestamp).toLocaleString()}</td>

                                    <td>
                                        <button 
                                            className='btn btn-link'
                                        >   
                                            <Link href={`/admin/responses/${response.videoid?._id}/${response._id}`} target="_blank">
                                                Explore
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="join self-center">
                {renderPaginationButtons()}
            </div>
        </div>
    )
}

export default ResponseTable