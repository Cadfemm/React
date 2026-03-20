const SEC = 60          // 60 Seconds per minute
const MIN = 60          // 60 Minutes per hour
const HRS = 24          // 24 Hours per day
const DAYS = 30         // Average whole no of days in months 
const MONTHS = 12       // Total months in a year
const EPOCH = 1000      // Milliseconds


// Today's Date
const todayDate = new Date()

// Convert into local date string
const localDateTimeString = (date, curr=false) => {
    if (!date && !curr) return '-';
    if (curr){
        date = todayDate
    }
    return new Date(date).toLocaleDateString()
}

// Calculate days duration 
const calculateDuration = (date) => {
    if (!date) return '-';
    const setDate = new Date(date)
    const diffMs = todayDate - setDate

    if (diffMs < 0) return "-"
    const days = Math.floor(diffMs/(EPOCH*MIN*SEC*HRS))
    const months = Math.floor(days/DAYS)
    const years = Math.floor(months/MONTHS)

    if (years>0){
        return years + "yr" + months % MONTHS + "mo"
    } else if(months>0){
        return months + "mo"
    } else {
        return days + "days"
    }
}

export {
    calculateDuration,
    localDateTimeString
}