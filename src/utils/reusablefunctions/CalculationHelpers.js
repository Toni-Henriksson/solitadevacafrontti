export const Round = (value, precision) => {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
export const SecToMinutes = (seconds) => {
    let minutes = seconds / 60;
    return minutes;
}