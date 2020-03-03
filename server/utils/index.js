/**
 * Returns today's date object.
 * @return {date} - today
 */
const generateToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth(); //January is 0!
    const dd = today.getDate();

    return new Date(yyyy, mm, dd);
}
