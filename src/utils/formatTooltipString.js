const formatTooltipString = (str) => {

    let string = "'" + str.title + "'\n";

    string += str.options.map((o) => (
        `'${o.count}' chose '${o.option}'`
    )).join("\n");

    return string;
}

export default formatTooltipString;