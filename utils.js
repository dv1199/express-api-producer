function getCurrentISTTime() {
    const date = new Date();
    const offset = date.getTimezoneOffset() == 0 ? 0 : -1 * date.getTimezoneOffset();
    let normalized = new Date(date.getTime() + (offset) * 60000);
    let currentISTTime = new Date(normalized.toLocaleString("en-US", {timeZone: "Asia/Calcutta"}));
    return currentISTTime;
}

module.exports = {
    getCurrentISTTime
}