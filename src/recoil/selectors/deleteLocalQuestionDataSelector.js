import { createQuestionState } from "@recoil/atoms/questionsAtom";
import { selector } from "recoil";

export const deleteLocalQuestionDataSelector = selector({
    key: 'deleteQuestionDataSelector',
    get: ({ get }) => {
        // This is a dummy get function. It doesn't have to do anything.
        // You can return a default value or manipulate some data here, but it's not needed for the delete operation.
        return null; // Dummy get, return a default value or manipulate data as needed
    },
    set: ({ get, set }, videoId) => {
        // Get the current question state for the videoId
        const questionState = get(createQuestionState(videoId));

        // Clear the question state for the given videoId
        const updatedQuestionState = [];

        // Update the question state with the updated data
        set(createQuestionState(videoId), updatedQuestionState);

        // Update local storage by removing the data for the videoId
        localStorage.removeItem(`questionData_${videoId}`);
    },
});
