import React, { useEffect } from 'react'
import { useState } from 'react';

const DeleteAssessment = ({ video, fetchVideos }) => {

	const onDelete = async () => {
        let modal = document.getElementById('my_modal_2');

        console.log(video);
        
        const res = await fetch("/api/videos/delete/" +  video._id, {
            method: "DELETE",
        })

        if(res.ok) {
            modal.close();
            await fetchVideos();
        }
        else
            console.error("error while deleting video");
	}
	
    useEffect(() => {
      console.log(video.title);
    
    }, [video])
    
	return (
		<>
			<dialog id="my_modal_2" className="modal">	
				<div className="modal-box flex flex-col">
					<h3 className="font-bold text-lg text-center">Do you want to delete the "{video.title}" assessment and the questions under it?</h3>
					<div className="modal-action flex-start flex-col">
					
						<div className='my-2 px-4 w-full flex-center gap-4'>
							<form method="dialog" className=' w-1/2'>
								<button className="btn w-full">Cancel</button>
							</form>
							<button 
								className="btn btn-error w-1/2" 
								type='submit'
								onClick={onDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>	
	)
}

export default DeleteAssessment