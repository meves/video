export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate)
    
    let day = date.getDay().toString()
    let month = date.getMonth().toString()
    day = day.length === 1 ? `0${day}` : day
    month = month.length === 1 ? `0${month}` : month

    return `${day}.${month}.${date.getFullYear().toString()}`
}