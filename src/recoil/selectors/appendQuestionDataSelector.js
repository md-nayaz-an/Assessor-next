'use client';

import { createQuestionState } from "@recoil/atoms/questionsAtom";
import { selector } from "recoil";

export const appendQuestionDataSelector = selector({
    key: 'appendQuestionDataSelector',
    get: ({ get }, videoId) => {
        // Get the current question state for the videoId
        return get(createQuestionState(videoId));
    },
    set: ({ get, set }, { videoId, newData }) => {
        // Get the current question state for the videoId
        const questionState = get(createQuestionState(videoId));
    
        // Append the new data to the existing question data
        const updatedData = [...questionState, newData];
    
        // Update the question state with the updated data
        set(createQuestionState(videoId), updatedData);
    
        // Update local storage with the updated data
        localStorage.setItem(`questionData_${videoId}`, JSON.stringify(updatedData));
    },
});