const getLocalStorageData = (videoId) => {
    try {
        const localStorageDataCache = localStorage.getItem(`questionData_${videoId}`);
        const initialState = localStorageDataCache ? JSON.parse(localStorageDataCache) : [];
        return initialState;
    } catch (error) {
        return [];
    }
};

export default getLocalStorageData