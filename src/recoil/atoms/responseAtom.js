import { atom } from 'recoil';

export const createResponseState = (videoId) => {
  return atom({
    key: `responseState_${videoId}`,
    default: {
      videoId: videoId,
      response: [], // Initialize with an empty array
      timestamp: Date.now(), // Initialize with the current timestamp (or any other initial timestamp)
    },
  });
};
