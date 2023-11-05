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

    const fetchResponses = async () => {
        const res = await fetch('/api/responses', {
            cache: 'no-store'
        });

        const data = await res.json();
        setResponses(data);
    }

    useEffect(() => {
        fetchResponses();
    }, []);

    useEffect(() => {
        console.log(responses);
    }, [responses]);

    return (
        <div className='w-full h-96 p-4 rounded shadow-lg flex flex-col'>
            <h1 className='text-lg'>
                Responses
            </h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Assessment Title</th>
                        <th>Attempted on</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody
                        className='text-base'
                    >
                        {
                            responses.map((response, index) => (
                                <tr>
                                    <th>{index}</th>
                                    <td>
                                        <div
                                            className='flex flex-col gap-1'
                                        >
                                            <span className='mx-2'>{response.name}</span>
                                            {
                                                response.mail && 
                                                <span className='badge text-xs'>{response.mail}</span>
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className='flex'
                                        >
                                            {response.videoid.title}
                                            <button
                                                className='btn btn-ghost btn-xs'
                                            >
                                                <Link href={"/admin/assessments/" + response.videoid._id} target="_blank">
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
                                            onClick={() => {
                                                router.push(`/admin/responses/${response._id}?`)
                                            }}
                                        >
                                            Explore
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 1024 1024">
                                                <path d="M364.8 106.666667L298.666667 172.8 637.866667 512 298.666667 851.2l66.133333 66.133333L768 512z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default ResponseTable