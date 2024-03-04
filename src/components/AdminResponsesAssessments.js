"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const AdminResponsesAssessments = () => {

    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        const res = await fetch('/api/analytics/videos', {
            cache: 'no-store'
        });

        const data = await res.json();
        setVideos(data);
    }

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className='w-full h-96 p-4 rounded shadow-lg flex flex-col'>
            <h1 className='text-lg'>
                Responses By Videos
            </h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>{" "}</th>
                        <th>Assessment Title</th>
                        <th>Count</th>
                        <th>{" "}</th>
                    </tr>
                    </thead>
                    <tbody
                        className='text-base'
                    >
                        {
                            videos.map((video, index) => (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div
                                            className='flex'
                                        >
                                            {video._id.title}
                                            <button
                                                className='btn btn-ghost btn-xs'
                                            >
                                                <Link href={"/admin/assessments/" + video._id?._id} target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path xmlns="http://www.w3.org/2000/svg" id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>    
                                                    </svg>
                                                </Link>
                                            </button>
                                        </div>
                                    </td>
                                    <td>{video.responseCount}</td>

                                    <td>
                                        <button 
                                            className='btn btn-link'
                                        >   
                                            <Link href={`/admin/responses/${video._id?._id}`} target="_blank">
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
        </div>
    )
}

export default AdminResponsesAssessments