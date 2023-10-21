'use client';

import videoIdParser from '@utils/videoIdParser';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useCallback } from 'react';
import NewAssessment from './NewAssessment';

const Assessments = ({ admin }) => {

    const [videos, setVideos] = useState([]);
    
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
        console.log(videos);
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
                            className="box-border card w-full lg:w-[32%] bg-base-100 shadow-md border border-base-100 hover:shadow-lg hover:border-accent"
                            onClick={() => onClick(video._id, videoIdParser(video.url))}
                        >
                            <figure>
                                <Image src={`https://i.ytimg.com/vi/${videoIdParser(video.url)}/0.jpg`} alt="Shoes" width={480} height={360}/>
                            </figure>
                            <div className="card-body p-4">
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