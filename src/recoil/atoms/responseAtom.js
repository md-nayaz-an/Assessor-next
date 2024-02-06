import { atom } from 'recoil';

export const createResponseState = (videoId) => {
  console.log(`responseState_${videoId}`);
  return atom({
    key: `responseState_${videoId}`,
    default: {
      videoId: videoId,
      userid: "",
      response: [], // Initialize with an empty array
      timestamp: Date.now(), // Initialize with the current timestamp (or any other initial timestamp)
    },
  });
};
