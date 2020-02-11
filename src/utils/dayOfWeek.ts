type dayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

export const getDateOfWeek = (date: Date): dayOfWeek => {
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const dayOfWeek: dayOfWeek = week[date.getDay()] as dayOfWeek
    return dayOfWeek
}