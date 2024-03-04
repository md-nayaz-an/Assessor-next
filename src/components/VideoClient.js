import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player';

const VideoClient = (props) => {

    const session = useSession();


    return (
        <ReactPlayer
            ref={props.playerRef}
            className={`${(session?.data?.userData?.role === "admin") ? " pointer-events-auto" : "pointer-events-none"}`}
            width={"100%"}
            height={"100%"}
            url={props.url}
            playing={props.play}

            onPlay={() => props.setPlay(true)}
            onPause={() => props.setPlay(false)}
            onProgress={(e) => props.setVideoProgress(e)}

            controls={session?.data?.userData?.role === "admin"}
            config={{ youtube: { playerVars: 
                { 
                    disablekb: 1,
                    showinfo: 0, 
                } } }}
        />
    )
}

export default VideoClient;