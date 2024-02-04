import { createResponseState } from '@recoil/atoms/responseAtom';
import { selector } from 'recoil';

export const updateResponseSelector = selector({
    key: 'updateResponseSelector', 
    get: ({ get }) => async ({ videoId, userid, questionId }) => {
        const responseState = get(createResponseState(videoId, userid));
    
        // Find and return the specific response object based on questionId
        const response = responseState.response.find(
            (response) => response.questionId === questionId
        );
    
        if (response) {
            return response;
        } else {
          // Return a default response or handle the case when the response is not found
            return { questionId, options: [], status: 0 };
        }
    },
    set: ({ get, set }, { videoId, userid, questionId, updatedValues }) => {
        // Get the current response state for the video
        const responseState = get(createResponseState(videoId, userid));

        // Find the index of the response object with the matching questionId
        const responseIndex = responseState.response.findIndex(
            (response) => response.questionid === questionId
        );

        if (responseIndex !== -1) {
            // Update the specific response object
            const updatedResponse = {
                ...responseState.response[responseIndex],
                ...updatedValues,
            };

            // Create a new response array with the updated response object
            const newResponseArray = [...responseState.response];
            newResponseArray[responseIndex] = updatedResponse;
            
            // Update the response state with the new response array
            set(createResponseState(videoId, userid), {
                ...responseState,
                response: newResponseArray,
            });
        }
    },
});
