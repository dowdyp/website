const prefixFmt = (s) => `[${s}]`
const log = (prefix, consoleFn) => (...messages) => {
    consoleFn(prefixFmt(prefix), ...messages);
}


const logger = {
    info: log("INFO", console.info),
    end: () => console.log("=======================\n")
}

module.exports = {
    logger
}