'use client';

import videoIdParser from '@utils/videoIdParser';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useCallback } from 'react';
import NewAssessment from './NewAssessmentModal';
import DeleteAssessment from './DeleteAssessmentModal';

const Assessments = ({ admin }) => {

    const [videos, setVideos] = useState([]);
    const [deleteSelectedVideo, setDeleteSelectedVideo] = useState({});
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
        
            return params.toString()
        },
        [searchParams]
    )


    const fetchVideos = async () => {
        const res = await fetch('/api/videos', {
            cache: 'no-store'
        });
        const data = await res.json();
        setVideos(data);
    }
    
    useEffect(() => {
        fetchVideos();

        videos.map((video) => {
            console.log(video._id);
        })
    }, [])
    
    const onClick = (videoId, videoUrlId) => {
        if(admin)
            router.push(`/admin/assessments/${videoId}?` + createQueryString("videoUrlId", videoUrlId));
        else
            router.push(`/client/assessments/${videoId}?` + createQueryString("videoUrlId", videoUrlId));
    }

    
    return (
        <section className="mt-4 mx-auto w-full flex justify-center items-center flex-col gap-2 overflow-auto">
            {
                admin &&
                <NewAssessment 
                    setVideos={setVideos}
                />
            }
            <div className="flex flex-row flex-wrap p-2 gap-4">
                {
                    videos.map((video) => (
                        <div 
                            key={video._id}
                            className="box-border z-0 card w-full lg:w-[32%] bg-base-100 shadow-md border border-base-100 hover:shadow-lg hover:border-accent"
                        >
                            {
                                admin &&
                                <div
                                    className='absolute z-10 top-2 right-2'
                                >
                                    <button 
                                        className="btn btn-circle btn-error"
                                        onClick={()=> {
                                            setDeleteSelectedVideo(video)
                                            document.getElementById('my_modal_2').showModal()
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' viewBox="0 0 24 24" stroke="currentColor">    
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"/>
                                        </svg>
                                    </button>
                                    <DeleteAssessment 
                                        video={deleteSelectedVideo} 
                                        fetchVideos={fetchVideos}
                                    />
                                </div>
                            }
                            <figure
                                onClick={() => onClick(video._id, videoIdParser(video.url))}
                            >
                                <Image 
                                    src={`https://i.ytimg.com/vi/${videoIdParser(video.url)}/0.jpg`} 
                                    alt="video placeholder" 
                                    width={480} 
                                    height={270}
                                />


                            </figure>

                            <div className="card-body p-4"
                                onClick={() => onClick(video._id, videoIdParser(video.url))}
                            >
                                <h2 className="card-title">
                                    {video.title}
                                </h2>
                                <p>{video.description}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}

export const fetchCache = 'force-no-store';
export default Assessments