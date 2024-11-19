import { DateTime } from 'luxon'

const readableDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, {
    zone: 'Europe/Paris',
  }).setLocale('en').toLocaleString(DateTime.DATE_FULL)
}

export {
  readableDate
}