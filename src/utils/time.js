const timeDictionary = [
  { name: '9am', value: 9 },
  { name: '10am', value: 10 },
  { name: '11am', value: 11 },
  { name: '1pm', value: 13 },
  { name: '2pm', value: 14 },
  { name: '3pm', value: 15 },
  { name: '4pm', value: 16 },
  { name: '5pm', value: 17 }
]

function timeAsString(timeValue) {
  return timeDictionary.find((time) => time.value === timeValue)?.name
}

function timestampToDateString(timestamp) {
  const date = new Date(timestamp)
  return dateToString(date)
}

function dateToTimestamp(date) {
  return Date.parse(date.toUTCString())
}

function dateToString(date) {
  return date.toLocaleString('en-GB').split(',')[0]
}

export { timeAsString, timestampToDateString, dateToTimestamp, dateToString, timeDictionary }
