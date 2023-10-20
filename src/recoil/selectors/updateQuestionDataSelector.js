'use client';

import { createQuestionState } from '@recoil/atoms/questionsAtom';
import { selector } from 'recoil';

export const updateQuestionDataSelector = selector({
    key: 'updateQuestionDataSelector',
    get: ({ get }, { videoId, index }) => {
        // Get the current question state for the videoId
        const questionState = get(createQuestionState(videoId));

        // Make sure the index is within bounds
        if (index >= 0 && index < questionState.length) {
        // Return the question data at the specified index
        return questionState[index];
        }

        // If the index is out of bounds or the question data is not available, you can return a default value, such as null.
        return null;
    },
    set: ({ get, set }, { videoId, index, updatedData }) => {
        // Get the current question state for the videoId
        const questionState = get(createQuestionState(videoId));

        // Make sure the index is within bounds
        if (index >= 0 && index < questionState.length) {
            // Create a copy of the question data array
            const updatedQuestionState = [...questionState];

            // Update the specific item at the provided index
            updatedQuestionState[index] = updatedData;

            // Update the question state with the updated data
            set(createQuestionState(videoId), updatedQuestionState);

            // Update local storage with the updated data
            localStorage.setItem(`questionData_${videoId}`, JSON.stringify(updatedQuestionState));
        }
    },
});
