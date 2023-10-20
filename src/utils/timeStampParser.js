const timeStampParser = (timestamp) => {
    
    return `${Math.floor(timestamp / 60)}`
            + `:` +
            `${Math.floor(timestamp) % 60}`;
}

export default timeStampParser