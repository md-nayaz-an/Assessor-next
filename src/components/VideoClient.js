import { useSession } from 'next-auth/react';
import React from 'react'
import ReactPlayer from 'react-player';

const VideoClient = (props) => {

    const session = useSession();

    return (
        <ReactPlayer
            ref={props.playerRef}
            
            width={"100%"}
            height={"100%"}
            url={props.url}
            playing={props.play}

            onPlay={() => props.setPlay(true)}
            onPause={() => props.setPlay(false)}
            onProgress={(e) => props.setVideoProgress(e)}
            controls={session?.data?.userData?.role === "admin"}
        />
    )
}

export default VideoClient;