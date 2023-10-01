import React from 'react'

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const VideoClient = (props) => {
    return (
        <ReactPlayer
            width={"100%"}
            height={"100%"}
            url={props.url}

            onProgress={(e) => props.setVideoProgress(e)}
        />
    )
}

export default VideoClient;