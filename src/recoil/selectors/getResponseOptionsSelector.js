import { createResponseState } from '@recoil/atoms/responseAtom';
import { selectorFamily } from 'recoil';

// Define a selector family that takes an object with videoId, userid, and questionId as the parameter
export const getResponseOptionsSelector = selectorFamily({
    key: 'getResponseOptionsSelector',
    // The get callback receives the parameter as the first argument
    get: ({ videoId, userid, questionId }) => ({ get }) => {
        const responseState = get(createResponseState(videoId, userid));

        // Find and return the specific response object based on questionId
        const response = responseState.response.find(
            (response) => response.questionid === questionId
        );

        console.log(responseState);

        if (response) {
            return response.options;
        } else {
        // Return a default response or handle the case when the response is not found
            return [];
        }
    },
});