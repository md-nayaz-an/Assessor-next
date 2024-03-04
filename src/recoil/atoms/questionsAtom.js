import getLocalStorageData from '@utils/getLocalData';
import { atom } from 'recoil';

export const createQuestionState = (videoId) => {
    
    let initialState = getLocalStorageData(videoId);
    return atom({
        key: `questionState_${videoId}`,
        default: initialState,
    });
};