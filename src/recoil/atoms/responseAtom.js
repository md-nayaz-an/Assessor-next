import { atom } from 'recoil';

export const createResponseState = (videoId, userid) => {

  return atom({
    key: `responseState_${videoId}_${userid}`,
    default: {
      videoId: videoId,
      userid: userid,
      response: [], // Initialize with an empty array
      timestamp: Date.now(), // Initialize with the current timestamp (or any other initial timestamp)
    },
  });
};
