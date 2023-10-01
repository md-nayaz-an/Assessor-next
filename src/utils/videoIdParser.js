function videoIdParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    try {
        var match = url.match(regExp);
        return (match&&match[7].length === 11)? match[7] : false;
    }
    catch(err) {
        return false;
    }
}

export default videoIdParser;