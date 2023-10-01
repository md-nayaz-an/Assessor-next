import { selector } from 'recoil';
import { createResponseState } from './recoil';

export const updateResponseSelector = selector({
    key: 'updateResponseSelector',
    set: ({ get, set }, { videoId, questionId, updatedValues }) => {
        // Get the current response state for the video
        const responseState = get(createResponseState(videoId));

        // Find the index of the response object with the matching questionId
        const responseIndex = responseState.response.findIndex(
            (response) => response.questionId === questionId
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
            set(createResponseState(videoId), {
                ...responseState,
                response: newResponseArray,
            });
        }
    },
});
