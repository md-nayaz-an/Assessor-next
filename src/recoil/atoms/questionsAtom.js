'use client';

import { atom } from 'recoil';

export const createQuestionState = (videoId) => {
    // Try to get data from local storage for the given videoId
    const localStorageData = localStorage.getItem(`questionData_${videoId}`);

    // Initialize with the data from local storage or an empty array
    const initialState = localStorageData ? JSON.parse(localStorageData) : [];

    return atom({
        key: `questionState_${videoId}`,
        default: initialState,
    });
};